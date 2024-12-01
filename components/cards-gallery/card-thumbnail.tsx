"use client";

import React, { useState, useEffect } from "react";
// Utils
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/app/utils/supabase/client";

type CardThumbnailProps = {
  cardRender: string | undefined | null;
  cardName: string | undefined | null;
  cardId: number | undefined | null;
  width: "sm" | "md";
};

export default function CardThumbnail({
  cardRender: initialCardRender,
  cardName,
  cardId,
  width,
}: CardThumbnailProps) {
  const [cardRender, setCardRender] = useState<string | undefined | null>(
    initialCardRender
  );

  const supabase = createClient();

  useEffect(() => {
    if (!cardId) return;

    const channel = supabase
      .channel(`card-render-${cardId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "nexus_cards",
          filter: `id=eq.${cardId}`,
        },
        (payload: { new: { card_render?: string[] } }) => {
          setCardRender(payload.new.card_render?.[0]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, cardId]);

  if (!cardRender) return null;

  return (
    <div
      className={clsx(
        "relative aspect-[5/7]",
        width === "sm" && "w-[200px]",
        width === "md" && "w-[240px]"
      )}
    >
      <Link
        href={`/cards/${cardId}`}
        className={clsx(
          "block w-full h-full rounded-lg overflow-hidden",
          "cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-foreground/20",
          "hover:border hover:border-teal-500"
        )}
      >
        <Image
          src={cardRender}
          alt={cardName || "Card"}
          fill
          className="object-cover"
        />
      </Link>
    </div>
  );
}
