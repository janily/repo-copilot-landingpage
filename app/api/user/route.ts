import { auth, db } from '@/lib/firebase/firebase-admin';
import { prefixByEnv } from "@/lib/prefixByEnv";
// import { convertFirestoreTimestamp } from "@/lib/utils";
import { StoreUserData, UserData } from "@/types/user";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

  if (!idToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userRef = db.collection(prefixByEnv("users")).doc(uid);
    const userSnap = await userRef.get();

    const existingData = userSnap.data() as Partial<StoreUserData> | undefined;

    const updatedStoreData: UserData = {
      uid: uid,
      displayName: decodedToken.name || null,
      email: decodedToken.email || null,
      lastLoginAt: new Date(), // TODO:
      credits: existingData ? existingData.credits || 0 : Number(process.env.NEXT_PUBLIC_NEW_USER_CREDITS || 0),
      photoURL: decodedToken.picture || undefined
    };

    await userRef.set(updatedStoreData, { merge: true });

    // const subscription = existingData?.subscription

    let userData
    // if (subscription) {
    //   const endDateTimestamp = subscription.endDate?.seconds
    //   const timeDiff = endDateTimestamp - dayjs().valueOf() / 1000

    //   const isActive = subscription && (timeDiff > 0) // 前端判断用于显示，后端调功能会用服务器时间比对
    //   const isPauseOrCancel = !!subscription.isPauseOrCancel // 如果是true，则显示什么时候到期，提醒续订

    //   const isExpireSoon = timeDiff <= 60 * 60 * 24 * 3 && timeDiff >= 0

    //   userData = {
    //     ...updatedStoreData,
    //     subscription: {
    //       subscriptionId: subscription.subscriptionId,
    //       endDateTimestamp,
    //       // endDateStr: convertFirestoreTimestamp(subscription.endDate),
    //       isActive,
    //       isPauseOrCancel,
    //       isExpireSoon,
    //       aiKeys: subscription.aiKeys
    //     }
    //   }
    // } else {
    userData = {
      ...updatedStoreData
    }
    // }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error processing user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
