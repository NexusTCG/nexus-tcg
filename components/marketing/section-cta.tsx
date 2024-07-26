import React from "react";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/marketing/section-container";

export default function SectionCTA() {
  return (
    <SectionContainer label="cta" bgImage size="md">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Start making cards</h2>
        <p className="text-xl text-white mb-8">
          Join our community and unleash your creativity today!
        </p>
        <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
          Sign Up Now
        </Button>
      </div>
    </SectionContainer>
  );
}