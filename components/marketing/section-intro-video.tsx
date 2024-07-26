import React from "react";
import SectionContainer from "@/components/marketing/section-container";

export default function SectionIntroVideo() {
  return (
    <SectionContainer
      label="intro-video"
      size="lg"
    >
      <div
        id="video-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          gap-8
          w-full
        "
      >
        <div className="w-full md:max-w-[1024px] max-w-[720px] aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/pWmZjnXH9Tk?si=69MiOGEQK8fMpwr4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div
          id="video-section-content"
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-4
            max-w-2xl
            w-full
            px-4
            sm:px-0
          "
        >
          <h2
            className="
              text-start
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-semibold
              w-full
            "
          >
            Intro to Nexus
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 text-start w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}