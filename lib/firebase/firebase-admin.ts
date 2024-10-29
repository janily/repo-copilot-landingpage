import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error; // 重新抛出错误，以便上层代码可以处理
  }
}

export const db = getFirestore();
export const auth = getAuth();

// 可选：添加一个简单的测试函数来验证连接
export async function testFirebaseConnection() {
  try {
    await db.collection('test').doc('test').set({ test: true });
    console.log('Firebase connection test successful');
    await db.collection('test').doc('test').delete();
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    throw error;
  }
}
