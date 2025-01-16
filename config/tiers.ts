import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free",
    price: "Free",
    href: siteConfig.openSourceURL || "#",
    description: "Sign up to get 100 free credits for code visualization and explanation.",
    features: [
      "100 free credits",
      "Code structure visualization",
      "AI-powered code explanation",
      "Basic flow chart generation",
    ],
    buttonText: "Get started",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "免费",
    price: "免费",
    href: siteConfig.openSourceURL || "#",
    description: "注册即可获得100个免费积分用于代码可视化和解释。",
    features: [
      "100个免费积分",
      "代码结构可视化",
      "AI代码解释",
      "基础流程图生成",
    ],
    buttonText: "开始使用",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "無料",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description: "サインアップして、コードの可視化と説明のための100個の無料クレジットを取得できます。",
    features: [
      "100個の無料クレジット",
      "コード構造の可視化",
      "AI駆動のコード説明",
      "基本的なフローチャート生成",
    ],
    buttonText: "始める",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "مجاني",
    price: "مجاناً",
    href: siteConfig.openSourceURL || "#",
    description: "سجل للحصول على 100 رصيد مجاني لتصور الكود وشرحه.",
    features: [
      "100 رصيد مجاني",
      "تصور هيكل الكود",
      "شرح الكود بالذكاء الاصطناعي",
      "إنشاء مخططات تدفق أساسية",
    ],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Gratuito",
    price: "Gratis",
    href: siteConfig.openSourceURL || "#",
    description: "Regístrate para obtener 100 créditos gratuitos para visualización y explicación de código.",
    features: [
      "100 créditos gratuitos",
      "Visualización de estructura de código",
      "Explicación de código con IA",
      "Generación básica de diagramas de flujo",
    ],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Бесплатно",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description: "Зарегистрируйтесь и получите 100 бесплатных кредитов для визуализации и объяснения кода.",
    features: [
      "100 бесплатных кредитов",
      "Визуализация структуры кода",
      "ИИ-объяснение кода",
      "Базовая генерация блок-схем",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU
}