import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Custom Components
import SectionContainer from "@/components/marketing/section-container";
// Icons
import { MdOpenInNew } from "react-icons/md";
import { FaSteam } from "react-icons/fa6";

const badgeMessage = "Very Early Alpha";
const cardImage = "/images/marketing/steam-workshop-thumbnail.jpg";
const steamLink = "https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215";

export default function SectionSteam() {
  return (
    <SectionContainer
      label="steam" bgImage size="lg">
      <div
        id="steam-content-container"
        className="
          flex 
          flex-col 
          md:flex-row-reverse
          justify-start
          items-center
          max-w-4xl
          gap-8
          md:gap-16
          mt-8
          md:mt-4
        "
      >
        <div
          id="steam-content"
          className="
            flex
            flex-col
            justify-start
            items-start
            md:w-3/5
            mb-4
            gap-8
            md:gap-12
          "
        >
          <div
            id="steam-body"
            className="
              flex
              flex-col
              justify-start
              items-start
              w-full
            "
          >
            <Badge
              variant="outline"
              className="
                hidden
                md:block
                border-amber-400 
                text-amber-400
                mb-4
                md:mb-6
              "
            >
              {badgeMessage.toUpperCase()}
            </Badge>
            <h2
              className="
                text-2xl
                md:text-4xl
                font-medium
                md:font-semibold 
                mb-2
                md:mb-4 
                text-white
              "
            >
              Play Nexus right now
            </h2>
            <p className="md:text-lg text-md font-medium text-neutral-300">
              Nexus TCG is live on Steam Workshop.<br />
              Get the Tabletop Simulator mod to play.
            </p>
          </div>
          <a href={steamLink} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="
                text-md
                font-semibold
                gap-6
                px-4
              "
            >
              <span className="flex flex-row justify-start items-center gap-2">
                <FaSteam className="w-[1.2rem] h-[1.2rem]" />
                Nexus on Steam
              </span>
              <MdOpenInNew className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </a>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <div
              id="steam-image-container"
              style={{
                aspectRatio: "1 / 1",
                position: "relative",
                overflow: "hidden",
              }}
              className="
                md:w-[400px]
                w-full
                border
                hover:border-2
                border-white/50
                hover:border-teal-400
                md:rounded-lg
                rounded-md
                shadow-xl
                shadow-black/20
                hover:shadow-teal-400/20
              "
            >
              <a href={steamLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={cardImage}
                  alt="Nexus TCG on Steam Workshop"
                  fill
                  style={{ 
                    objectFit: "cover" 
                  }}
                />
              </a>
            </div>
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p>Go to Nexus TCG on Steam</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </div>
    </SectionContainer>
  );
}