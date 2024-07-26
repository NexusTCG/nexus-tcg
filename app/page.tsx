import React from "react";
// Components
import NavBar from "@/components/navbar";
import SectionHero from "@/components/marketing/section-hero";
import SectionIntroVideo from "@/components/marketing/section-intro-video";
import SectionFeaturedCards from "@/components/marketing/section-featured-cards";
import SectionSocialProof from "@/components/marketing/section-social-proof";
import SectionAppUI from "@/components/marketing/section-app-ui";
import SectionSteam from "@/components/marketing/section-steam";
import SectionCTA from "@/components/marketing/section-cta";
import SectionFooter from "@/components/marketing/section-footer";

export default function Marketing() {
  return (
    <div
      id="marketing-page-container"
      className="flex flex-col justify-start items-center min-h-screen w-full"
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