export const dynamic = "force-dynamic";

import React from "react";
// Server
import { getCurrentUserId } from "@/app/server/auth";
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Custom components
import dynamicImport from "next/dynamic";

const Sidebar = dynamicImport(
  () => import("@/components/dashboard-nav/sidebar"),
  { ssr: false }
);
const HorizontalNav = dynamicImport(
  () => import("@/components/dashboard-nav/horizontal-nav"),
  { ssr: false }
);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let currentUserId = null;
  let userProfile = null;

  try {
    currentUserId = await getCurrentUserId();
    userProfile = await getUserProfileDTO();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <div
      id="dashboard-layout-container"
      className="
        flex
        flex-col
        sm:flex-row
        w-full
        min-h-screen
      "
    >
      <div className="hidden sm:block">
        <Sidebar currentUserId={currentUserId} userProfile={userProfile} />
      </div>
      <div className="sm:hidden">
        <HorizontalNav
          currentUserId={currentUserId}
          userProfile={userProfile}
        />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
