import React from "react";
// Utils
import Link from "next/link";
// Actions
import { calculateTimeAgo } from "@/app/utils/actions/actions";
// Components
import { Button } from "@/components/ui/button";

type CardRenderFooterProps = {
  createdAt?: string | null;
  updatedAt?: string;
  username: string;
}

export default function CardRenderFooter({
  createdAt,
  updatedAt,
  username,
}: CardRenderFooterProps) {
  return (
    <div 
      id="card-creator-footer" 
      className="
        flex 
        flex-row 
        justify-between 
        items-center 
        w-full 
        border-t 
        border-zinc-700 
        p-4
        gap-2
      "
    >
      <p className="text-sm">
        {updatedAt && updatedAt !== createdAt ? (
          <>
            <span className="opacity-60">
              Updated{" "}
            </span>
            <span className="font-medium">
              {calculateTimeAgo(updatedAt)}
            </span>
          </>
        ) : (
          <>
            <span className="opacity-60">
              Created{" "}
            </span>
            <span className="font-medium">
              {calculateTimeAgo(createdAt)}
            </span>
          </>
        )}
        <span className="opacity-60">{" "}by{" "}</span>
        <span
          className="
            font-medium 
            text-teal-500 
            hover:underline 
            hover:opacity-80
          "
        >
          <Link href={`/profile/${username}`}>
            {username}
          </Link>
        </span>
      </p>
      <div
        className="
          flex 
          flex-row 
          justify-end 
          items-center
          gap-2
        "
      >
        <Button size="sm" className="font-medium">
          Share
        </Button>
        <Button size="sm" className="font-medium">
          Download
        </Button>
      </div>
    </div>
  )
}