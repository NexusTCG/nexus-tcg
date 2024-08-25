"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navItems } from "@/app/lib/data/data";
import { ProfileDTO } from "@/app/lib/types/dto";
import UserAvatar from "@/components/user-avatar";

export default function HorizontalNav({
  currentUserId,
  userProfile,
}: {
  currentUserId: string | null;
  userProfile: ProfileDTO | null;
}) {
  return (
    <nav className="flex justify-between items-center w-full h-[60px] px-4 border-b">
      <div className="flex items-center space-x-2">
        {navItems.slice(0, 3).map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" size="sm">
              <item.icon className="h-[1.2rem] w-[1.2rem] mr-2" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
      <div>
        {currentUserId && userProfile ? (
          <UserAvatar
            avatarUrl={userProfile.avatar_url || ""}
            userName={userProfile.username || "User"}
            size="sm"
          />
        ) : (
          <Link href="/login">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}