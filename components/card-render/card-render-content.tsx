"use client";

import React from "react";
// Utils
import { AnimatePresence } from "framer-motion";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CardContentProps = {
  activeMode: 'initial' | 'anomaly';
  toggleMode: () => void;
  children: React.ReactNode;
}

export default function CardContent({ 
  activeMode,
  toggleMode,
  children
}: CardContentProps) {
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
                <form action={toggleMode}>
                  <button
                    type="submit"
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
                  </button>
                </form>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>View {
                  activeMode === "initial" 
                    ? "Anomaly" 
                    : "Initial"
                } mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AnimatePresence>
      </div>
    </div>
  );
};