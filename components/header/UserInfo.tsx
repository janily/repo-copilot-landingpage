import { useToast } from "@/hooks/use-toast";
import { UserData } from "@/types/user";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { BiCoinStack } from "react-icons/bi";

interface Props {
  userData: UserData | null;
  fetchUserData: () => void;
}

export default function UserInfo({ userData, fetchUserData }: Props) {
  const { toast } = useToast();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshUserData = async () => {
    if (userData && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await fetchUserData();
      } catch (error) {
        console.error("Error refreshing data:", error);
        toast({
          variant: "destructive",
          title: "Refresh failed",
          description: "An error occurred while refreshing your data.",
        });
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-start gap-2 py-2 md:p-2">
      <div className="flex flex-col space-y-1 leading-none">
        {userData?.email && (
          <div>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              Display Name: {userData.displayName}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              Email: {userData.email}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground flex items-center">
              Credits:
              <BiCoinStack className="mx-1" /> {userData?.credits || 0}
              <RefreshCcw
                className={`w-4 h-4 ml-2 cursor-pointer transition-transform duration-500 ease-in-out ${
                  isRefreshing ? "animate-spin" : ""
                }`}
                onClick={refreshUserData}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
