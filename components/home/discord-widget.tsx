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

export default function DiscordWidget() {
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
        <CardTitle className="text-lg">Join the Nexus TCG Discord</CardTitle>
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
                href="https://discord.gg/invite/BZWVK4F6My"
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
                Discord
              </a>
              <MdOpenInNew className="w-[1rem] h-[1rem]" />
            </TooltipTrigger>
            <TooltipContent side="bottom">Go to Discord</TooltipContent>
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
          id="discord-banner"
          style={{ position: "relative" }}
          className="
            w-full 
            h-[300px] 
            group
          "
        >
          <Image
            src="/images/discord-banner.jpg"
            alt="Nexus TCG Discord"
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
            <p className="font-semibold">Nexus TCG Discord Server</p>
            <p className="text-sm max-w-[80%]">
              Join the Nexus TCG communit on our Discord server for support,
              discussions, and voting on cards.{" "}
              <a
                href="https://discord.gg/invite/BZWVK4F6My"
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
                Join now!
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
