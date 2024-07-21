import React from "react";
// Utils
import Link from "next/link";
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"

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
        px-4
        py-6
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
          <div>Collapse</div>
        </div>
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
            <Button className="w-full">
              Home
            </Button>
          </Link>
          <Link href="/create">
            <Button className="w-full">
              Create
            </Button>
          </Link>
          <Link href="/cards">
            <Button className="w-full">
              Cards
            </Button>
          </Link>
          <Link href="/notifications">
            <Button className="w-full">
              Notifications
            </Button>
          </Link>
        </div>
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
            <Button className="w-full">
              Learn
            </Button>
          </Link>
          <Link href="/play">
            <Button className="w-full">
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
        <UserAvatar />
        <div>Logout</div>
      </div>
    </div>
  )
}