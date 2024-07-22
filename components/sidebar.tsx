"use client"

import React from "react";
// Utils
import Link from "next/link";
// Shadcn components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Custom components
import UserAvatar from "@/components/user-avatar"
import { 
  MdHome, 
  MdDesignServices, 
  MdOutlineLayers, 
  MdNotifications,
  MdOutlinePeople,
  MdOutlineBook,
  MdChevronRight,
} from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";

const userName = "John"; // Replace with fetched data

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="
        flex
        flex-col
        justify-between
        items-center
        w-[240px]
        min-w-[240px]
        min-h-screen
        border-r
        p-4
      "
    >
      <div
        id="sidebar-content"
        className="
          flex
          flex-col
          w-full
          gap-4
        "
      >
        <div
          id="sidebar-header"
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
          "
        >
          <div>Logo</div>
          <Button variant="ghost" size="icon">
            <GoSidebarCollapse className="text-lg" />
          </Button>
        </div>
        <Separator />
        <div
          id="nav-primary"
          className="
            flex
            flex-col
            w-full
            gap-1
          "
        >
          <Link href="/home">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdHome className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/create">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdDesignServices className="mr-2 h-4 w-4" />
              Create
            </Button>
          </Link>
          <Link href="/cards">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdOutlineLayers className="mr-2 h-4 w-4" />
              Cards
            </Button>
          </Link>
          <Link href="/notifications">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdNotifications className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </Link>
        </div>
        <Separator />
        <div
          id="nav-secondary"
          className="
            flex
            flex-col
            w-full
            gap-1
          "
        >
          <Link href="/learn">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdOutlineBook className="mr-2 h-4 w-4" />
              Learn
            </Button>
          </Link>
          <Link href="/play">
            <Button
              variant="ghost"
              className="
                flex
                flex-row
                justify-start
                w-full
              "
            >
              <MdOutlinePeople className="mr-2 h-4 w-4" />
              Play
            </Button>
          </Link>
        </div>
      </div>
      <div
        id="sidebar-footer"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
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
          <UserAvatar />
          <p className="hover:cursor-pointer hover:text-zinc-200">
            {userName}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MdChevronRight className="text-lg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}