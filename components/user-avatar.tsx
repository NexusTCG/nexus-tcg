import React from "react"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import clsx from "clsx"

// Add fetch from supabase
type UserAvatarProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  avatarUrl?: string;
  userName?: string;
}

export default function UserAvatar({ 
  size,
  avatarUrl,
  userName,
}: UserAvatarProps) {
  return (
    <Avatar className={clsx("",
      {
        "w-6 h-6": size === "xs",
        "w-8 h-8": size === "sm",
        "w-10 h-10": size === "md",
        "w-12 h-12": size === "lg",
        "w-14 h-14": size === "xl",
        "w-16 h-16": size === "2xl",
      }
    )} >
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>
        {userName?.charAt(0)}
        {userName?.charAt(1)}
      </AvatarFallback>
    </Avatar>
  )
}