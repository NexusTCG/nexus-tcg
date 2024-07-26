import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/marketing/section-container";

export default function SectionAppUI() {
  return (
    <SectionContainer label="app-ui" size="lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl font-bold text-white mb-6">Make cards in minutes</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our intuitive card creator lets you design custom cards quickly and easily.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Try Card Creator
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/app-ui.png"
            alt="Card Creator Interface"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </SectionContainer>
  );
}