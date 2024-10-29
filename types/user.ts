import type { Timestamp } from "firebase/firestore";

// 用户信息基础类型
export interface BaseUserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  lastLoginAt: Date;
  credits: number;
  photoURL?: string;
}
// 插件端用户信息
export interface UserData extends BaseUserData {
  subscription?: {
    endDateTimestamp: number;
    endDateStr: string;
    isPauseOrCancel: string;
    subscriptionId?: string;
    isActive: boolean;
    isExpireSoon: boolean;
    aiKeys?: string;
  }
}
// 数据库用户表
export interface StoreUserData extends BaseUserData {
  subscription?: {
    endDate: Timestamp;
    isPauseOrCancel?: string;
    isActive: boolean;
    aiKeys?: string;
  }
}
