"use client";

import React from "react";
import { CardDTO } from "@/app/lib/types/dto";
import CardRenderHeader from "@/components/card-render/card-render-header";
import CardContent from "@/components/card-render/card-render-content";

type ClientWrapperProps = {
  card: CardDTO;
  activeMode: "initial" | "anomaly";
  toggleMode: () => void;
  children: React.ReactNode;
};

export default function ClientWrapper({ 
  card, 
  activeMode, 
  toggleMode, 
  children 
}: ClientWrapperProps) {

  return (
    <>
      <CardRenderHeader 
        cardName={card.initialMode.name} 
        mode={activeMode} 
        toggleMode={toggleMode}
      />
      <CardContent
        activeMode={activeMode}
        toggleMode={toggleMode}
      >
        {children}
      </CardContent>
    </>
  );
}