// 处理用户相关的功能
import { db } from "@/lib/firebase/firebase"
import { prefixByEnv } from "@/lib/prefixByEnv"
import type { StoreUserData, UserData } from "@/types/user"
import type { User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

// 获取当前用户(插件端用户)，可以根据业务需求修改
export async function getCurrentUserInfo(userData: UserData | null) {
  if (!userData) {
    return null
  }

  try {
    const userRef = doc(db, prefixByEnv('users'), userData.uid)
    const userSnap = await getDoc(userRef)
    const existingData = userSnap?.data() as Partial<StoreUserData> | undefined

    const currentUser = userData && {
      ...existingData
    } || null
    return currentUser
  } catch (error) {
    console.error("Error in updateFirestoreUser:", error);
    throw error; // 或者根据你的错误处理策略来处理
  }
}

// 保存用户到 firestore
export async function updateFirestoreUser(user: User) {
  if (!user) {
    return null
  }

  try {
    const userRef = doc(db, prefixByEnv('users'), user.uid)
    const userSnap = await getDoc(userRef)
    const existingData = userSnap?.data() as Partial<StoreUserData> | undefined

    const updatedUser = user && {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLoginAt: new Date(user.metadata.lastSignInTime as string).toISOString(),
      credits: existingData ? existingData.credits || 0 : Number(process.env.PLASMO_PUBLIC_NEW_USER_CREDITS || 0),
      subscription: existingData?.subscription || null,
    }

    await setDoc(userRef, updatedUser, { merge: true })
    return updatedUser
  } catch (error) {
    console.error("Error in updateFirestoreUser:", error);
    throw error; // 或者根据你的错误处理策略来处理
  }
}