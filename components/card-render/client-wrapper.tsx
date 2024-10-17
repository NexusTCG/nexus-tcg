"use client";

import React from "react";
import { ProfileDTO, CardDTO } from "@/app/lib/types/dto";
import CardRenderPageHeader from "@/components/card-render/card-render-page-header";
import CardRenderPageFooter from "@/components/card-render/card-render-page-footer";
import CardRenderContent from "@/components/card-render/card-render-content";

type ClientWrapperProps = {
  user?: ProfileDTO | null;
  card: CardDTO;
  activeMode: "initial" | "anomaly";
  initialCardArtUrl?: string;
  anomalyCardArtUrl?: string;
  children: React.ReactNode;
};

export default function ClientWrapper({
  user,
  card,
  activeMode,
  initialCardArtUrl,
  anomalyCardArtUrl,
  children,
}: ClientWrapperProps) {
  const currentCardArtUrl = activeMode === "initial" ? initialCardArtUrl : anomalyCardArtUrl;

  return (
    <>
      <CardRenderPageHeader user={user} card={card} mode={activeMode} />
      <CardRenderContent activeMode={activeMode} cardId={card.id ?? 0}>
        {children}
      </CardRenderContent>
      {card && (
        <CardRenderPageFooter
          createdAt={card.created_at ?? undefined}
          updatedAt={card.updated_at ?? undefined}
          username={card.username ?? ""}
          cardId={card.id ?? 0}
          activeMode={activeMode}
          currentCardArtUrl={currentCardArtUrl}
          initialCardArtUrl={initialCardArtUrl}
          anomalyCardArtUrl={anomalyCardArtUrl}
        />
      )}
    </>
  );
}
