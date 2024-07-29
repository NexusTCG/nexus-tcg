import React from "react";
// Server
import { getCurrentUserId } from "@/app/server/auth";
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Custom components
import Sidebar from "@/components/sidebar/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let currentUserId = null;
  let userProfile = null;
  
  try {
    currentUserId = await getCurrentUserId();
    userProfile = await getUserProfileDTO();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

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