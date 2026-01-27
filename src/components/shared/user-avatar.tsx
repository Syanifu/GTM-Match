import Link from "next/link";
import { UserPreview } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserAvatarProps {
  user: UserPreview;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  showReputation?: boolean;
  linkToProfile?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

export function UserAvatar({
  user,
  size = "md",
  showName = false,
  showReputation = false,
  linkToProfile = true,
}: UserAvatarProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarElement = (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );

  const content = (
    <div className="flex items-center gap-2">
      {avatarElement}
      {showName && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user.name}</span>
          {showReputation && (
            <span className="text-xs text-muted-foreground">
              {user.reputation} reputation
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (!linkToProfile) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/profile/${user.username}`} className="hover:opacity-80 transition-opacity">
            {content}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.reputation} reputation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
