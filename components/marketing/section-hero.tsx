import React from "react";
// Utils
import Image from "next/image";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
// Custom Components
import SectionContainer from "@/components/marketing/section-container";
// Icons
import { MdArrowForward } from "react-icons/md";

const badgeMessage = "Digital Trading Card Game";
const cardImage = "/images/card-placeholder.png";

export default function SectionHero() {
  return (
    <SectionContainer
      label="hero"
      size="lg"
      bgImage
    >
      <div
        id="hero-content-container"
        className="
          flex 
          flex-col 
          md:flex-row
          justify-start
          items-center
          max-w-4xl
          gap-4
          md:gap-8
          mt-8
          md:mt-4
        "
      >
        <div
          id="hero-content"
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
            id="hero-body"
            className="
              flex
              flex-col
              justify-start
              items-start
            "
          >
            <Badge
              variant="outline"
              className="
                hidden
                md:block
                border-teal-400 
                text-teal-400
                mb-4
                md:mb-6
              "
            >
              {badgeMessage.toUpperCase()}
            </Badge>
            <h1
              className="
                text-6xl
                md:text-7xl
                font-medium
                md:font-semibold 
                mb-4
                md:mb-6 
                text-white
              "
            >
              Play player-made cards
            </h1>
            <p className="md:text-xl text-medium font-medium text-neutral-300">
              Create your own Nexus cards with AI.<br />
              Then play them with your friends.
            </p>
          </div>
          <div
            id="hero-cta"
            className="*:
              flex
              flex-col
              justify-start
              items-start
              gap-4
            "
          >
            <Button
              size="lg"
              className="
                text-lg
                font-semibold
                gap-2
                bg-teal-400
                hover:bg-teal-300
              "
            >
              Join to create cards
              <MdArrowForward className="w-[1.2rem] h-[1.2rem] font-bold" />
            </Button>
            <small className="text-neutral-300 text-md">
              One-click with Google, Discord, and Twitch
            </small>
          </div>
        </div>
        <div
          id="card-creator-container"
          className="
            hidden
            md:flex
            md:w-2/5 
            mb-10 
            md:mb-0
            gap-4
            shadow-lg
            rounded-xl
            border
            border-neutral-500/20
            shadow-black/20
            overflow-hidden
          "
        >
          {/* Add your card image here */}
          <Image
            src={cardImage}
            alt="Card Creator"
            width={400}
            height={560}
          />
        </div>
      </div>
    </SectionContainer>
  );
}