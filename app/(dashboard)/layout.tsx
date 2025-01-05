export const dynamic = "force-dynamic";

import React from "react";
// Utils
import { headers } from "next/headers";
import clsx from "clsx";
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

  // Check if current path is /cards route
  const headersList = headers();
  const currentPath = headersList.get("x-current-path") || "";
  const isCardsRoute = currentPath === "/cards";

  if (isCardsRoute) {
    console.log("Dashboard Layout: Current path is /cards route");
  }

  return (
    <div
      id="dashboard-layout-container"
      className={clsx(
        "flex flex-col sm:flex-row w-full",
        !isCardsRoute && "min-h-screen"
      )}
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
      <div
        id="dashboard-content-container"
        className={clsx(
          "flex-1 w-full overflow-x-hidden p-0",
          !isCardsRoute && "sm:p-4"
        )}
      >
        {children}
      </div>
    </div>
  );
}
