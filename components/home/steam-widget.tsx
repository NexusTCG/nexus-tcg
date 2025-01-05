import React from "react";
// Utils
import Image from "next/image";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import { MdOpenInNew } from "react-icons/md";

export default function SteamWidget() {
  return (
    <Card className="w-full">
      <CardHeader
        className="
          flex
          flex-row
          justify-between
          items-center
          border-b 
          border-zinc-700 
          py-3
          px-4
        "
      >
        <CardTitle className="text-lg">Play Nexus TCG</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="
                flex
                flex-row
                justify-center
                items-center
                gap-1
                text-muted-foreground
                hover:text-foreground
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              <a
                href="https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215"
                rel="noreferrer"
                target="_blank"
                className="
                  text-sm
                  text-muted-foreground
                  hover:text-foreground
                  transition-colors
                  duration-300
                  inline
                "
              >
                Steam Workshop
              </a>
              <MdOpenInNew className="w-[1rem] h-[1rem]" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Go to Steam Workshop</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          overflow-hidden
          rounded-b-md
          p-0
        "
      >
        <div
          id="steam-workshop-banner"
          style={{ position: "relative" }}
          className="
            w-full 
            h-[300px] 
            group
          "
        >
          <Image
            src="/images/steam-workshop-banner.jpg"
            alt="Nexus TCG Steam Workshop"
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            className="
            absolute 
            inset-0 
            bg-black/70 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300 
            flex 
            flex-col
            justify-end
            items-start 
            text-white
            gap-2
            p-4
          "
          >
            <p className="font-semibold">Nexus Trading Card Game Mod</p>
            <p className="text-sm max-w-[80%]">
              Nexus TCG is available as a free Steam Workshop mod to Tabletop
              Simulator.{" "}
              <a
                href="https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215"
                rel="noreferrer"
                target="_blank"
                className="
                text-teal-400 
                hover:text-teal-500 
                transition-colors 
                duration-300 
                hover:underline
                inline
              "
              >
                Subscribe to play!
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
