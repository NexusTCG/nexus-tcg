"use client";

import React, { useState, useEffect } from "react";
// Utils
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/app/utils/supabase/client";
// Components
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const [cardRender, setCardRender] = useState<string | undefined | null>(
    initialCardRender
  );

  const dimensions = {
    sm: {
      width: 200,
      height: 280,
    },
    md: {
      width: 240,
      height: 336,
    },
  }[width];

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
        (payload: { new: { card_render?: string } }) => {
          setCardRender(payload.new.card_render);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, cardId]);

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
          "cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-foreground/20"
        )}
      >
        {(isLoading || !cardRender) && (
          <Skeleton
            className="absolute inset-0 z-10"
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        )}
        {cardRender && (
          <Image
            src={cardRender}
            alt={cardName || "Card"}
            fill
            className="object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)} // Handle load errors
          />
        )}
      </Link>
    </div>
  );
}
