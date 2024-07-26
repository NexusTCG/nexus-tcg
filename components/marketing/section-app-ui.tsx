import React from "react";
// Utils
import Image from "next/image";
// Custom components
import SectionContainer from "@/components/marketing/section-container";

export default function SectionAppUI() {
  return (
    <SectionContainer
      label="app-ui"
      size="lg"
    >
      <div
        id="app-ui-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          h-full
          flex-grow
          gap-8
          px-4
          sm:px-0
        "
      >
        <div
          id="app-ui-image-container"
          style={{ 
            position: "relative", 
            overflow: "hidden" 
          }}
          className="
            flex-grow
            w-full
            h-full
            max-w-[1024px]
            min-w-[256]px
            max-h-[600px]
            min-h-[150px]
          "
        >
            <Image
              src="/images/marketing/nexus-ui.png"
              alt="Nexus Card Creator UI"
              fill
              style={{ objectFit: "contain"}}
            />
        </div>
        <div
          id="app-ui-section-content"
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-2
            max-w-2xl
            w-full
            px-4
            sm:px-0
          "
        >
          <h4
            className="
              text-start
              text-xl
              sm:text-1xl
              md:text-2xl
              font-semibold
              w-full
            "
          >
            Make cards in minutes
          </h4>
          <p className="text-base sm:text-lg text-neutral-300 text-start w-full">
            Pointing and click to make a Nexus card. Finish with custom AI-generated art.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}