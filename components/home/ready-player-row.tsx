import React from "react";
// Utils
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
// Custom components
import UserAvatar from "@/components/user-avatar"

type ReadyPlayerRowProps = {
  username: string;
  avatarUrl: string;
  nextAvailability: string; // TODO: Make date
};

export default function ReadyPlayerRow({
  username,
  avatarUrl,
  nextAvailability,
}: ReadyPlayerRowProps) {

  return (
    <div
      id="row-container"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-3
        min-h-[48px]
        text-sm
        gap-4
      "
    >
      <div
        id="avatar-username"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
          flex-1
          min-w-0
        "
      >
        <UserAvatar
          avatarUrl={avatarUrl}
          userName={username}
          size={"sm"}
        />
        <Link href={`/profile/${username}`} className="hover:text-teal-500 truncate">
          {username ? username : "Username"}
        </Link>
      </div>
      <Link href={`/profile/${username}`}>
        <Button variant="outline" size="sm" className="w-[100px] min-w-[100px]">{nextAvailability}</Button>
      </Link>
    </div>
  );
}