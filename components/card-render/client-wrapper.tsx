"use client";

import React from "react";
import { ProfileDTO, CardDTO } from "@/app/lib/types/dto";
import CardRenderHeader from "@/components/card-render/card-render-header";
import CardContent from "@/components/card-render/card-render-content";

type ClientWrapperProps = {
  user?: ProfileDTO | null;
  card: CardDTO;
  activeMode: "initial" | "anomaly";
  toggleMode: () => void;
  children: React.ReactNode;
};

export default function ClientWrapper({ 
  user,
  card, 
  activeMode, 
  toggleMode, 
  children 
}: ClientWrapperProps) {

  return (
    <>
      <CardRenderHeader 
        user={user}
        card={card} 
        mode={activeMode} 
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