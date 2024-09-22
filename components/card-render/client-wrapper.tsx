"use client";

import React from "react";
import { ProfileDTO, CardDTO } from "@/app/lib/types/dto";
import CardRenderHeader from "@/components/card-render/card-render-header";
import CardRenderFooter from "@/components/card-render/card-render-footer";
import CardRenderContent from "@/components/card-render/card-render-content";

type ClientWrapperProps = {
  user?: ProfileDTO | null;
  card: CardDTO;
  activeMode: "initial" | "anomaly";
  children: React.ReactNode;
};

export default function ClientWrapper({ 
  user,
  card, 
  activeMode, 
  children 
}: ClientWrapperProps) {

  return (
    <>
      <CardRenderHeader 
        user={user}
        card={card} 
        mode={activeMode} 
      />
      <CardRenderContent
        activeMode={activeMode}
        cardId={card.id ?? 0}
      >
        {children}
      </CardRenderContent>
      {card && (
        <CardRenderFooter
          createdAt={card.created_at ?? undefined}
          updatedAt={card.updated_at ?? undefined}
          username={card.username ?? ''}
        />
      )}
    </>
  );
}