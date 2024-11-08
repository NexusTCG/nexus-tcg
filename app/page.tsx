import React from "react";
// Utils
import dynamic from "next/dynamic";
// Custom components
import NavBar from "@/components/navbar";
import SectionHero from "@/components/marketing/section-hero";
// Dynamic custom components
const SectionIntroVideo = dynamic(
  () => import("@/components/marketing/section-intro-video")
);
const SectionFeaturedCards = dynamic(
  () => import("@/components/marketing/section-featured-cards")
);
const SectionSocialProof = dynamic(
  () => import("@/components/marketing/section-social-proof")
);
const SectionAppUI = dynamic(
  () => import("@/components/marketing/section-app-ui")
);
const SectionSteam = dynamic(
  () => import("@/components/marketing/section-steam")
);
const SectionCTA = dynamic(() => import("@/components/marketing/section-cta"));
const SectionFooter = dynamic(
  () => import("@/components/marketing/section-footer")
);

export default function Marketing() {
  return (
    <div
      id="marketing-page-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        min-h-screen
        w-full
        bg-black
        text-white
      "
    >
      <NavBar />
      <SectionHero />
      <SectionIntroVideo />
      <SectionFeaturedCards />
      <SectionSocialProof />
      <SectionSteam />
      <SectionAppUI />
      <SectionCTA />
      <SectionFooter />
    </div>
  );
}
