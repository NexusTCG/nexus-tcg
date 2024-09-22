"use client";

import React from "react";
// Utils
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CardRenderContentProps = {
  activeMode: 'initial' | 'anomaly';
  cardId: number;
  children: React.ReactNode;
}

export default function CardRenderContent({ 
  activeMode,
  cardId,
  children
}: CardRenderContentProps) {
  const newMode = activeMode === "initial" ? "anomaly" : "initial";

  return (
    <div 
      id="card-creator-content" 
      className="
        flex 
        flex-col 
        justify-center 
        items-center 
        w-full 
        flex-grow
        py-8 
        bg-zinc-800
        relative
        pb-36
      "
    >
      <div
        id="card-frames-wrapper"
        className="
          flex 
          flex-col
          justify-center 
          items-center
          w-full 
          h-full 
          relative 
        "
      >
        <AnimatePresence initial={false}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/cards/${cardId}?mode=${newMode}`}
                  className="
                    w-full
                    h-full
                    flex
                    justify-center
                    items-center
                    cursor-pointer
                  "
                >
                  {children}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>View {newMode} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AnimatePresence>
      </div>
    </div>
  );
};