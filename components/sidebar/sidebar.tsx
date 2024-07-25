"use client"

import React, { useState } from "react";
// Utils
import Link from "next/link";
import clsx from "clsx";
// Data
import { policyLinks } from "@/app/lib/data/data";
// Shadcn components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Custom components
import UserAvatar from "@/components/user-avatar"
import SidebarPopoverIcon from "@/components/sidebar/sidebar-popover-icon"
import SidebarProfileMenu from "@/components/sidebar/sidebar-profile-menu"
// Icons
import { 
  MdHome, 
  MdDesignServices, 
  MdOutlineLayers, 
  MdNotifications,
  MdOutlinePeople,
  MdOutlineBook,
} from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";

const userName = "John"; // Replace with fetched data

const navItems = [
  { href: "/home", icon: MdHome, label: "Home" },
  { href: "/create", icon: MdDesignServices, label: "Create" },
  { href: "/cards", icon: MdOutlineLayers, label: "Cards" },
  { href: "/notifications", icon: MdNotifications, label: "Notifications" },
];

const secondaryNavItems = [
  { href: "/learn", icon: MdOutlineBook, label: "Learn" },
  { href: "/play", icon: MdOutlinePeople, label: "Play" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  };

  function renderNavItems(items: { 
    href: string; 
    icon: React.ElementType; 
    label: string 
  }[]) {
    return items.map((item) => (
      <TooltipProvider key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.href}>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "default"}
                className={clsx(
                  "w-full",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon className={clsx(
                  "h-[1.2rem] w-[1.2rem]",
                  isCollapsed ? "m-0" : "mr-2"
                )} />
                {!isCollapsed && item.label}
              </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    ));
  }

  return (
    <div
      id="sidebar"
      className={`
        flex
        flex-col
        justify-between
        items-center
        ${isCollapsed ? 'w-[80px]' : 'w-[240px]'}
        min-h-screen
        border-r
        p-4
        transition-all
        duration-300
      `}
    >
      <div
        id="sidebar-content"
        className="flex flex-col w-full gap-4"
      >
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
              className="flex flex-row justify-start items-center w-full gap-2"
            >
              <UserAvatar />
              <p>{userName}</p>
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
              <TooltipContent side="right">
                Profile Menu
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          ) : (
            <div>
              <SidebarProfileMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}