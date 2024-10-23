"use client";

import React, { useState, useEffect } from "react";
// Utils
import dynamic from "next/dynamic";
// Types
import { CardsDTO } from "@/app/lib/types/dto";
// Custom components
const CardThumbnail = dynamic(
  () => import("@/components/cards-gallery/card-thumbnail"),
  {
    loading: () => (
      <div className="w-[240px] h-[336px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
  }
);

type CardsGalleryProps = {
  cards: CardsDTO;
};

export default function CardsGallery({ cards }: CardsGalleryProps) {
  const [thumbnailSize, setThumbnailSize] = useState<"sm" | "md">("md");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setThumbnailSize("sm");
      } else {
        setThumbnailSize("md");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="cards-gallery-container"
      className="
        flex
        flex-wrap
        justify-start
        items-start
        w-full
        h-full
        gap-4
        sm:gap-4
        px-auto
      "
    >
      {cards.map((card) => (
        <CardThumbnail
          key={card.id}
          cardRender={card.initialMode.render}
          cardName={card.initialMode.name}
          cardId={card.id}
          width={thumbnailSize}
        />
      ))}
    </div>
  );
}
