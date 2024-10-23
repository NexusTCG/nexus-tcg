"use client";

import React, { useState, useEffect } from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
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
  card: initialCard,
  activeMode,
  children,
}: ClientWrapperProps) {
  const [card, setCard] = useState(initialCard);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const currentCardArtUrl =
    activeMode === "initial"
      ? card.initialMode?.art_options?.[card.initialMode?.art_selected ?? 0]
      : card.anomalyMode?.art_options?.[card.anomalyMode?.art_selected ?? 0];

  useEffect(() => {
    const channel = supabase
      .channel(`public:nexus_cards:id=eq.${initialCard.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nexus_cards",
          filter: `id=eq.${initialCard.id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          try {
            setCard((prevCard) => ({ ...prevCard, ...payload.new }));
          } catch (err) {
            console.error("Error updating card state:", err);
            setError(err instanceof Error ? err : new Error(String(err)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialCard.id]);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

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
          discordPost={card.discord_post ?? false}
          discordPostUrl={card.discord_post_url ?? ""}
        />
      )}
    </>
  );
}
