"use client";

import React from "react";
// Types
import { ProfileDTO, CardDTO } from "@/app/lib/types/dto";
// Custom components
import CardRenderPageHeader from "@/components/card-render/card-render-page-header";
import CardRenderPageFooter from "@/components/card-render/card-render-page-footer";
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
  children,
}: ClientWrapperProps) {
  const currentCardArtUrl =
    activeMode === "initial"
      ? card.initialMode?.art_options?.[card.initialMode?.art_selected ?? 0]
      : card.anomalyMode?.art_options?.[card.anomalyMode?.art_selected ?? 0];

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
          userId={user?.user_id ?? null}
          cardId={card.id ?? 0}
          cardName={card.initialMode?.name ?? "Nexus TCG Card"}
          cardCreator={user?.username ?? ""}
          activeMode={activeMode}
          currentCardArtUrl={currentCardArtUrl}
        />
      )}
    </>
  );
}
