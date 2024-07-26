import React from "react";
// Utils
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
// Custom Components
import SectionContainer from "@/components/marketing/section-container";
// Icons
import { MdArrowForward } from "react-icons/md";

const badgeMessage = "Digital Trading Card Game";

export default function SectionCTA() {
  return (
    <SectionContainer label="cta" bgImage size="md">
      <div
        id="hero-content-container"
        className="
          flex 
          flex-col 
          justify-start
          items-start
          max-w-4xl
          gap-4
          md:gap-8
          w-full
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
            Your first card<br />
            is waiting
          </h1>
          <p className="md:text-xl text-medium font-medium text-neutral-300">
            Anyone can make Nexus cards.<br />
            And it only takes a minute.
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
          <Link href="/login">
            <Button
              size="lg"
              className="
                text-lg
                font-semibold
                gap-2
                bg-teal-400
                hover:bg-teal-300
                hover:shadow-lg
                hover:shadow-teal-300/10
                transition-all
              "
            >
              Join now
              <MdArrowForward className="w-[1.2rem] h-[1.2rem] font-bold" />
            </Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}