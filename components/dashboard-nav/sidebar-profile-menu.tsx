"use client";

// Hooks
import React, { useState } from "react";
// Utils
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Icons
import {
  MdChevronRight,
  MdOutlinePerson,
  MdOutlinePayment,
  MdOutlineSettings,
} from "react-icons/md";

const stripeUrl = "https://stripe.com"; // Replace with actual URL

export default function SidebarProfileMenu({ username }: { username: string }) {
  const [signoutDisabled, setSignoutDisabled] = useState<boolean>(false);

  async function signOut() {
    try {
      setSignoutDisabled(true);

      const response = await fetch("/api/auth/logout-user", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setSignoutDisabled(false);
    }
  }

  return (
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
            <Link
              href={`/${username}`}
              className="flex flex-row justify-start items-center gap-1"
            >
              <MdOutlinePerson className="h-[1.2rem] w-[1.2rem]" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row justify-start items-center gap-1"
            >
              <MdOutlinePayment className="h-[1.2rem] w-[1.2rem]" />
              Billing
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Link
              href="/settings"
              className="flex flex-row justify-start items-center gap-1"
            >
              <MdOutlineSettings className="h-[1.2rem] w-[1.2rem]" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={signOut}
          disabled={signoutDisabled}
        >
          {signoutDisabled ? "Logging out.." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
