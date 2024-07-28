import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"

// Add fetch from supabase
type UserAvatarProps = {
  size?: "sm" | "md" | "lg";
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
        "w-8 h-8": size === "sm",
        "w-12 h-12": size === "md",
        "w-16 h-16": size === "lg",
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