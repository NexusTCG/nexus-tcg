"use client"

// Hooks
import React, { useState } from "react"
import { useRouter } from 'next/navigation'
// Utils
import Link from "next/link";
import Router from "next/router";
import { createClient } from "@/app/utils/supabase/client"
// Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Icons
import { 
  MdChevronRight,
  MdOutlinePerson,
  MdOutlinePayment,
  MdOutlineSettings,
} from "react-icons/md";

const stripeUrl = "https://stripe.com"; // Replace with actual URL

export default function SidebarProfileMenu() {
  const supabase = createClient();
  const router = useRouter();

  const [signoutDisabled, setSignoutDisabled] = useState<boolean>(false);

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout error:", error.message)
      return
    } else {
      router.push("/login")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" >
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
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={signOut}
          disabled={signoutDisabled}
        >
          {signoutDisabled ? "Logging out.." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 