import React from "react";
// Utils
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button"

type NotificationRowProps = {
  username: string,
  action: "comment" | "vote" | "share",
  cardName: string,
  actionAt: string
};

export default function NotificationRow({
  username,
  action,
  cardName,
  actionAt,
}: NotificationRowProps) {

  return (
    <div
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-3
        min-h-[48px]
        gap-2
      "
    >
      <div
        className="
          flex
          flex-row
          flex-wrap
          sm:flex-nowrap
          justify-start
          items-center
          gap-1
          sm:gap-2
          text-sm
          flex-1
          min-w-0
        "
      >
        <Link
          href={`/profile/${username}`}
          className="hover:text-teal-500 whitespace-nowrap"
        >
          <p>{username ? username : "Username"}</p>
        </Link>
        <p className="opacity-50 whitespace-nowrap">
          {action === "comment" ? "commented on" :
           action === "vote" ? "voted for" :
           action === "share" ? "shared" :
           "interacted with"}
        </p>
        <p className="truncate">{cardName ? cardName : "Card name"}</p>
        <p className="opacity-50 whitespace-nowrap hidden sm:inline">{actionAt}</p>
      </div>
      {(
        action === "comment" || 
        action === "vote"
      ) && (
        // TODO: Make link dynamic URL based on cardId
        <Link href={`/cards/${cardName}`} className="flex-shrink-0">
          <Button variant="outline" size="sm">View</Button>
        </Link>
      )}
    </div>
  );
}