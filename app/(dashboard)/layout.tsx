import React from "react";
// Server
import { getCurrentUserId } from "@/app/server/auth";
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle"
// Custom components
import Sidebar from "@/components/sidebar/sidebar"
// Icons
import { FaSteam } from "react-icons/fa";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUserId = await getCurrentUserId();
  const userProfile = await getUserProfileDTO();

  return (
    <div
      id="protected-routes-layout"
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        h-min-screen
        overflow-y-auto
      "
    >
      <Sidebar currentUserId={currentUserId} userProfile={userProfile} />
      <div
        id="protected-routes-layout-content"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          h-screen
        "
      >
        {children}
      </div>
    </div>
  )
}