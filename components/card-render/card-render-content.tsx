"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeProvider, useMode } from "@/app/utils/context/CardModeContext";
import { CardDTO } from "@/app/lib/types/dto";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Custom components
import CardRender from "@/components/card-render/card-render";

const cardVariants = {
  active: { 
    y: 80, 
    zIndex: 20, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  inactive: { 
    y: 0, 
    zIndex: 10, 
    opacity: 0.6, 
    scale: 0.9,
    transition: { 
      duration: 0.3,
      opacity: { 
        duration: 0.3, 
        times: [0, 0.5, 1], 
        values: [1, 0.4, 0.6] 
      }
    }
  }
};

function CardContentInner({ card }: { card: CardDTO }) {
  const { mode, setMode } = useMode();

  function toggleMode() {
    setMode(mode === 'initial' ? 'anomaly' : 'initial');
  }

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
          {["anomaly", "initial"].map((cardMode) => (
            <motion.div
              key={cardMode}
              variants={cardVariants}
              initial="inactive"
              animate={mode === cardMode ? "active" : "inactive"}
              className="absolute inset-0 flex justify-center items-center"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      onClick={toggleMode}
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      <CardRender card={card} mode={cardMode as "initial" | "anomaly"} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>View {cardMode === "initial" ? "anomaly" : "initial"} mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CardContent({ 
  card 
}: { 
  card: CardDTO 
}) {
  return (
    <ModeProvider>
      <CardContentInner card={card} />
    </ModeProvider>
  );
}