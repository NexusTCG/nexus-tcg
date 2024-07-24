"use client"

import React from "react";
// Utils
import Link from "next/link";
import Image from "next/image";
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
import NexusIconWhite from "@/public/nexus-icon-white.svg"
// Icons
import { 
  MdHome, 
  MdDesignServices, 
  MdOutlineLayers, 
  MdNotifications,
  MdOutlinePeople,
  MdOutlineBook,
  MdChevronRight,
  MdOutlinePerson,
  MdOutlinePayment,
  MdOutlineSettings,
} from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";

const userName = "John"; // Replace with fetched data
const stripeUrl = "https://stripe.com"; // Replace with actual URL

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={NexusIconWhite}
                alt="Nexus TCG icon"
                width={32}
                height={32}
                className="
                  transition-transform duration-300 ease-in-out 
                  hover:rotate-45
                  hover:cursor-pointer
                "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/profile" className="flex flex-row justify-start items-center gap-1">
                    <MdOutlinePerson className="h-[1.2rem] w-[1.2rem]" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <a href={stripeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row justify-start items-center gap-1">
                    <MdOutlinePayment className="h-[1.2rem] w-[1.2rem]" />
                    Billing
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Link href="/settings" className="flex flex-row justify-start items-center gap-1">
                    <MdOutlineSettings className="h-[1.2rem] w-[1.2rem]" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* TODO: Add logout logic */}
              <DropdownMenuItem className="hover:cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <GoSidebarCollapse className="h-[1.2rem] w-[1.2rem]" />
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
              <MdHome className="mr-2 h-[1.2rem] w-[1.2rem]" />
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
              <MdDesignServices className="mr-2 h-[1.2rem] w-[1.2rem]" />
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
              <MdOutlineLayers className="mr-2 h-[1.2rem] w-[1.2rem]" />
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
              <MdNotifications className="mr-2 h-[1.2rem] w-[1.2rem]" />
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
              <MdOutlineBook className="mr-2h-[1.2rem] w-[1.2rem]" />
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
              <MdOutlinePeople className="mr-2 h-[1.2rem] w-[1.2rem]" />
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
            hover:opacity-80
          "
        >
          <UserAvatar />
          <p>{userName}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MdChevronRight className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="flex flex-row justify-start items-center gap-1">
                  <MdOutlinePerson className="h-[1.2rem] w-[1.2rem]" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <a href={stripeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row justify-start items-center gap-1">
                  <MdOutlinePayment className="h-[1.2rem] w-[1.2rem]" />
                  Billing
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link href="/settings" className="flex flex-row justify-start items-center gap-1">
                  <MdOutlineSettings className="h-[1.2rem] w-[1.2rem]" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* TODO: Add logout logic */}
            <DropdownMenuItem className="hover:cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}