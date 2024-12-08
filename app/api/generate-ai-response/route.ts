export const maxDuration = 60;

import { auth, db } from '@/lib/firebase/firebase-admin';
import { prefixByEnv } from '@/lib/prefixByEnv';
import { assembleCommentPrompt, assembleOverviewPrompt, assembleCodeExplainPrompt, assembleCodeVisualizationPrompt } from '@/lib/prompt';
import translations from '@/lib/translations';
import { ProductDetailTypes } from '@/types/product';
import { StoreUserData } from '@/types/user';
import { FieldValue } from 'firebase-admin/firestore';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const FEATURE_TO_COST: Record<string, string> = {
  'overviews': process.env.NEXT_PUBLIC_OVERVIEW_COST || '1',
  'comments': process.env.NEXT_PUBLIC_COMMENT_COST || '5',
  'chat': process.env.NEXT_PUBLIC_CHAT_COST || '1',  // 添加聊天功能的成本
  'explainCode': process.env.NEXT_PUBLIC_EXPLAIN_CODE_COST || '1',
  'codeVisualization': process.env.NEXT_PUBLIC_VISUALIZATION_COST || '1'  // Add cost for visualization
}

type ModelPlatform = 'ChatGPT' | 'Claude' | 'Gemini' | 'DeepSeek';

interface DetermineModelInput {
  feature: string;
  productDetails?: ProductDetailTypes;
  language?: string;
  length?: number;
  storeUserData: StoreUserData;
  messages?: Array<{role: string, content: string}>;  // 添加聊天消息数组
  codeDetails?: Array<{path: string, content: string}>;
}

interface ModelDetermination {
  prompt: string;
  model: string;
  modelPlatform: string;
  client: any;

}

interface SaveToFirebaseProps {
  productDetails: ProductDetailTypes;
  userId: string;
  email: string;
  aiResponse: string;
  feature: string;
}

const CREDITS_TIP = ({ language, key }: { language: string; key: string }) => {
  return translations[language][key]
}

export async function POST(request: NextRequest) {
  try {
    const { token, storeUserData } = await validateAuthToken(request);
    const { productDetails, feature, language, length, messages, codeDetails } = await request.json();

    // TODO: 有会员功能后，添加判断，符合条件（会员+有选择模型）这一步跳过
    await checkCredits(storeUserData, feature, language);

    const { prompt, model, client } = await setupAIModelAndPrompt({ productDetails, feature, language, length, storeUserData, messages, codeDetails });

    const stream = await generateAIResponse(client, model, prompt);
    return createStreamResponse(stream, storeUserData, productDetails, feature);
  } catch (error) {
    return handleError(error);
  }
}

async function validateAuthToken(request: NextRequest): Promise<{ token: string, storeUserData: StoreUserData }> {
  // 验证 Authorization 头
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized: Missing or invalid Authorization header');
  }

  const token = authHeader.split(' ')[1]
  // 验证 Firebase token
  try {
    const decodedToken = await auth.verifyIdToken(token)

    // 获取用户 uid
    const uid = decodedToken.uid
    // 从 Firestore 获取用户信息
    const userDoc = await db.collection(prefixByEnv("users")).doc(uid).get()

    if (!userDoc.exists) {
      throw new Error('User not found in database')
    }
    const storeUserData = userDoc.data() as StoreUserData
    return { token, storeUserData };
  } catch (error) {
    console.error('Error verifying token:', error)
    throw new Error('Unauthorized: Invalid token');
  }
}

async function checkCredits(storeUserData: StoreUserData, feature: string, language: string) {
  // 检测剩余 credits 是否足够
  if (storeUserData.credits < Number(FEATURE_TO_COST[feature])) {
    const errorMessage = await CREDITS_TIP({ language, key: `${feature}NeedMore` });
    throw new Error(errorMessage);
  }
}

async function generateAIResponse(client: any, model: string, prompt: string) {
  return await client.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
}

function createStreamResponse(stream: any, storeUserData: StoreUserData, productDetails: ProductDetailTypes, feature: string) {
  let fullResponse = '';
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          if (content) {
            fullResponse += content;
            controller.enqueue(`data: ${JSON.stringify({ content })}\n\n`)
          }
        }

        // 保存到 Firebase
        const userId = storeUserData.uid;
        const email = storeUserData.email || '';
        await saveToFirebase({ productDetails, userId, email, aiResponse: fullResponse, feature });
        // controller.enqueue(`data: [UPDATE_CREDITS]\n\n`)
        controller.enqueue('data: [DONE]\n\n')
        controller.close()
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    }
  );
}

function handleError(error: any) {
  console.error('Error generating AI response:', error)
  return new Response(JSON.stringify({ error: `AI response: ${error.message}` }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  })
}

async function saveToFirebase({ productDetails, userId, email, aiResponse, feature }: SaveToFirebaseProps) {
  try {
    const databaseName = feature // comments or overviews
    const docData = {
      userId,
      email,
      // 只在有 productDetails 时才添加
      ...(productDetails && { productDetails }),
      aiResponse: aiResponse,
      timestamp: new Date().toISOString()
    };

    const docId = await db.collection(prefixByEnv(databaseName)).add(docData);
    // 更新用户积分
    const cost = Number(FEATURE_TO_COST[feature])
    const userRef = db.collection(prefixByEnv("users")).doc(userId);
    await userRef.update({
      credits: FieldValue.increment(-cost)
    });
  } catch (e) {
    console.error('save failed: ', e);
    throw e;
  }
}

async function setupAIModelAndPrompt({ productDetails, feature, language, length, storeUserData, codeDetails }: DetermineModelInput): Promise<ModelDetermination> {
  let prompt;
  if (feature === 'overviews') {
    if (!productDetails) throw new Error('Product details are required for overviews');
    prompt = await assembleOverviewPrompt({ productDetails, language });
  } else if (feature === 'comments') {
    if (!productDetails) throw new Error('Product details are required for comments');
    prompt = await assembleCommentPrompt({ productDetails, length });
  } else if (feature === 'explainCode') {
    console.log('language', language);
    if (!codeDetails) throw new Error('Code details are required for explain');
    prompt = await assembleCodeExplainPrompt({ codeDetails, language });
  } else if (feature === 'codeVisualization') {
    if (!codeDetails) throw new Error('Code details are required for visualization');
    prompt = await assembleCodeVisualizationPrompt({ codeDetails, language });
  }
  const { model, modelPlatform, client } = await defaultModelAndPlatform({ feature });
  return { prompt: prompt!, model, modelPlatform, client };
}

const defaultModelAndPlatform = async ({ feature }: { feature: string }) => {
  if (feature === 'comments') {
    const model = process.env.COMMENT_MODEL || 'gpt-3.5-turbo';
    const modelPlatform = process.env.COMMENT_MODEL_PLATFORM || 'CHATGPT';
    const platformKey = (modelPlatform === 'DEEPSEEK' ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY);
    if (!platformKey) throw new Error('API key is required');
    const client = getPlatformClient({ platform: modelPlatform, key: platformKey });
    return { model, modelPlatform, client };
  } else if (feature === 'chat') {
    const model = process.env.CHAT_MODEL || 'gpt-3.5-turbo';
    const modelPlatform = process.env.CHAT_MODEL_PLATFORM || 'CHATGPT';
    const platformKey = (modelPlatform === 'DEEPSEEK' ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY);
    if (!platformKey) throw new Error('API key is required');
    const client = getPlatformClient({ platform: modelPlatform, key: platformKey });
    return { model, modelPlatform, client };
  } else if (feature === 'explainCode' || feature === 'codeVisualization') { 
    const model = process.env.VISUALIZATION_MODEL || 'gpt-3.5-turbo';
    const modelPlatform = process.env.VISUALIZATION_MODEL_PLATFORM || 'CHATGPT';
    const platformKey = (modelPlatform === 'QWEN' ? process.env.QWEN_API_KEY : process.env.OPENAI_API_KEY);
    if (!platformKey) throw new Error('API key is required');
    const client = getPlatformClient({ platform: modelPlatform, key: platformKey });
    return { model, modelPlatform, client };
  }
  // default for overviews
  const model = process.env.OVERVIEW_MODEL || 'gpt-3.5-turbo';
  const modelPlatform = process.env.OVERVIEW_MODEL_PLATFORM || 'CHATGPT';
  const platformKey = (modelPlatform === 'DEEPSEEK' ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY);
  if (!platformKey) throw new Error('API key is required');
  const client = getPlatformClient({ platform: modelPlatform, key: platformKey });
  return { model, modelPlatform, client };
}

const getPlatformClient = ({ platform, key }: { platform: string; key: string }) => {
  const lowerCase = platform.toUpperCase()
  if (lowerCase === 'CHATGPT') {
    return new OpenAI({
      apiKey: key
    })
  }
  if (lowerCase === 'DEEPSEEK') {
    return new OpenAI({
      apiKey: key,
      baseURL: process.env.DEEPSEEK_BASE_URL,
    })
  }

  if(lowerCase === 'QWEN') {
    return new OpenAI({
      apiKey: key,
      baseURL: process.env.QWEN_BASE_URL,
    })
  }
  throw new Error(`Unsupported platform: ${platform}`);
}
