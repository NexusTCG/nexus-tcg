"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
// Utils
import clsx from "clsx";
// Components
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
// Icons
import { ArrowUp } from "lucide-react";

export default function CardVotes({ 
  cardId,
}: { 
  cardId: number 
}) {
  const [votes, setVotes] = useState(1);

  // TODO: Implement vote fetching
  // TODO: Implement realtime vote fetching
  // TODO: Implement logic limiting vote button to once per user
  // TODO: Implement logic to undo vote
  useEffect(() => {
    const fetchVotes = async () => {
      const res = await fetch(`/api/votes?cardId=${cardId.toString()}`);
      const data = await res.json();
      setVotes(data.votes);
    };
    fetchVotes();
  }, [cardId]);

  return (
    <div
      id="card-render-votes"
      className="
        flex
        flex-row
        justify-center
        items-center
        px-4
        pr-2
        py-2
        gap-2
        bg-background
        rounded-lg
      "
    >
      <p className="text-lg font-semibold">
        {votes ? votes : 1}{" "}
        <span className="text-sm font-light opacity-80">
          {votes > 1 ? "votes" : "vote"}
        </span>
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ArrowUp
              className={clsx("w-[20px] h-[20px] font-bold hover:cursor-pointer hover:opacity-80 p-0.5 rounded-full mx-0.5",
                {
                  "bg-teal-400 text-background": votes === 1,
                  "text-red-500": votes < 0,
                  // TODO: Implement dynamic styling based on if user has voted
                }
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Upvote</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}