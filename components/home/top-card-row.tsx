"use client";

import React, { useState } from "react";
// Utils
import Link from "next/link";
import clsx from "clsx";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Icons
import { MdArrowCircleUp } from "react-icons/md";

type TopCardRowProps = {
  rank: number;
  cardName: string;
  votes: number;
  currentUserVoted: boolean;
  creator: string;
  createdAt: string;
};

export default function TopCardRow({
  rank,
  cardName,
  votes,
  currentUserVoted,
  creator,
  createdAt,
}: TopCardRowProps) {
  const [userHasVoted, setUserHasVoted] = useState(currentUserVoted ? true : false);

  // TODO: Implement voting with Supabase

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
      "
    >
      <div
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
        <div className="w-[1.2rem] h-[1.2rem] flex-shrink-0">
          <p className="text-zinc-500">#{rank}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdArrowCircleUp
                // onClick={upVoteCard()}
                className={clsx("w-[1.2rem] h-[1.2rem] hover:cursor-pointer flex-shrink-0", 
                  {
                    "opacity-100 text-teal-500 hover:opacity-50": currentUserVoted,
                    "opacity-50 hover:opacity-100": !currentUserVoted,
                  }
                )} 
              />
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{currentUserVoted ? `Remove vote for ${cardName}` : `Vote for ${cardName}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <h4 className="text-sm truncate">
          {cardName ? cardName : "Card name"}
        </h4>
      </div>
      <small className="text-xs block-inline hidden sm:inline-block">
        <span className="opacity-50">Created</span>{" "}
        {createdAt}{" "} 
        <span className="opacity-50">ago by</span>{" "}
        <Link href={`/profile/${creator}`} className="hover:text-teal-500">{creator ? creator : "Username"}</Link>
      </small>
    </div>
  );
}