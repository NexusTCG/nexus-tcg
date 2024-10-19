"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/app/hooks/user-media-query";
// Utils
import Link from "next/link";
import clsx from "clsx";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Data
import { navItems, secondaryNavItems, policyLinks } from "@/app/lib/data/data";
// Shadcn components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Custom components
import UserAvatar from "@/components/user-avatar";
import SidebarPopoverIcon from "@/components/dashboard-nav/sidebar-popover-icon";
import SidebarProfileMenu from "@/components/dashboard-nav/sidebar-profile-menu";
// Icons
import { GoSidebarCollapse } from "react-icons/go";
import { MdOutlineBook } from "react-icons/md";
import { MdLogin } from "react-icons/md";

export default function Sidebar({
  currentUserId,
  userProfile,
}: {
  currentUserId: string | null;
  userProfile: ProfileDTO | null;
}) {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isLoading = currentUserId === null || userProfile === null;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function renderNavItems(
    items: {
      href: string;
      icon: React.ElementType;
      label: string;
      requiresUser?: boolean;
      internalUrl?: boolean;
    }[]
  ) {
    return items
      .map((item) => {
        if (item.requiresUser && !currentUserId && !isLoading) {
          return null;
        }

        return (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                {item.internalUrl ? (
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      size={isCollapsed ? "icon" : "default"}
                      className={clsx(
                        "w-full",
                        isCollapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          "h-[1.2rem] w-[1.2rem]",
                          isCollapsed ? "m-0" : "mr-2"
                        )}
                      />
                      {!isCollapsed && item.label}
                    </Button>
                  </Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size={isCollapsed ? "icon" : "default"}
                      className={clsx(
                        "w-full",
                        isCollapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          "h-[1.2rem] w-[1.2rem]",
                          isCollapsed ? "m-0" : "mr-2"
                        )}
                      />
                      {!isCollapsed && item.label}
                    </Button>
                  </a>
                )}
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })
      .filter(Boolean);
  }

  useEffect(() => {
    setIsCollapsed(isMediumScreen);
  }, [isMediumScreen]);

  return (
    <div
      id="sidebar"
      className={`
        flex
        flex-col
        justify-between
        items-center
        ${isCollapsed ? "w-[80px]" : "w-[240px]"}
        border-r
        min-h-screen
        p-4
        transition-all
        duration-300
        sticky
        top-0
      `}
    >
      <div id="sidebar-content" className="flex flex-col w-full gap-4">
        <div
          id="sidebar-header"
          className="flex flex-row justify-between items-center w-full"
        >
          {!isCollapsed && <SidebarPopoverIcon />}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <GoSidebarCollapse className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCollapsed ? "Expand" : "Collapse"} sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div id="nav-primary" className="flex flex-col w-full gap-1">
          {renderNavItems(navItems)}
        </div>
        <Separator />
        <div id="nav-secondary" className="flex flex-col w-full gap-1">
          {renderNavItems(secondaryNavItems)}
        </div>
        <Separator />
        {!isCollapsed && (
          <div
            id="nav-links"
            className="
              flex 
              flex-wrap 
              w-full 
              gap-x-1.5
              gap-y-0.5
            "
          >
            {Object.values(policyLinks).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.65rem" }}
                className="
                  text-zinc-500
                  hover:underline 
                  opacity-40 
                  hover:opacity-50
                  transition-all
                "
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div
        id="sidebar-footer"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          gap-2
        "
      >
        {currentUserId ? (
          <div
            id="sidebar-profile"
            className={clsx(
              "flex flex-row items-center w-full",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            {!isCollapsed && (
              <div
                id="avatar-username-container"
                className="
                  flex 
                  flex-row 
                  justify-start 
                  items-center 
                  w-full 
                  gap-2
                "
              >
                {userProfile?.avatar_url && userProfile?.username && (
                  <UserAvatar
                    avatarUrl={userProfile.avatar_url}
                    userName={userProfile.username}
                    size={"sm"}
                  />
                )}
                {userProfile?.username && (
                  <p className="w-full max-w-[100px] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {userProfile.username}
                  </p>
                )}
              </div>
            )}
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarProfileMenu />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">Profile Menu</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div>
                <SidebarProfileMenu />
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="w-full">
            <Button
              variant={isCollapsed ? "ghost" : "default"}
              size={isCollapsed ? "icon" : "default"}
              className={clsx(
                "w-full",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <MdLogin
                className={clsx(
                  "h-[1.2rem] w-[1.2rem]",
                  isCollapsed ? "m-0" : "mr-2"
                )}
              />
              {!isCollapsed && "Login"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
