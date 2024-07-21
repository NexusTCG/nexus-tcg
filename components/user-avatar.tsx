import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Add fetch from supabase

export default function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}