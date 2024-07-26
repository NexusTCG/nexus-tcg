import React from "react";
// Utils
import Image from "next/image";
// Components
import { Button } from "@/components/ui/button";
// Custom components
import SectionContainer from "@/components/marketing/section-container";

export default function SectionSteam() {
  return (
    <SectionContainer
      label="steam" size="lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <Image
            src="/images/tabletop-simulator.png"
            alt="Tabletop Simulator"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Play Nexus today, using Tabletop Simulator
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience your custom cards in a fully-featured digital tabletop environment.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Get it on Steam
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}