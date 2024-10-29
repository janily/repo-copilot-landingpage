import { Icons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/user";

export default function UserAvatar({ userData }: { userData: UserData }) {
  return (
    <Avatar className="h-8 w-8">
      {userData.photoURL ? (
        <AvatarImage alt="Picture" src={userData.photoURL} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{userData.displayName}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
