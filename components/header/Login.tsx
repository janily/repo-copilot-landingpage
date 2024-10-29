"use client";

import UserAvatar from "@/components/header/UserAvatar";
import UserInfo from "@/components/header/UserInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/firebase";
import {
  getCurrentUserInfo,
  updateFirestoreUser,
} from "@/lib/firebase/userService";
import { useUserStore } from "@/store/userStore";
import { UserData } from "@/types/user";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function Login() {
  const { toast } = useToast();
  const { userData, setUserData } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userInfo = await updateFirestoreUser(currentUser);
        setUserData(userInfo as unknown as UserData);
        return;
      }
      setUserData(null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
    }
  };

  const fetchUserData = async () => {
    const userInfo = await getCurrentUserInfo(userData);
    setUserData(userInfo as unknown as UserData);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout",
      });
    }
  };

  return (
    <>
      {!userData ? (
        <Button variant="outline" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar userData={userData} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <UserInfo userData={userData} fetchUserData={fetchUserData} />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={handleLogout}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
