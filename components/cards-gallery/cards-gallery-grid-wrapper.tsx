"use client";

import React, { useState } from "react";
// Utils
import dynamic from "next/dynamic";
// Types
import { CardDTO, CardsDTO } from "@/app/lib/types/dto";
// Components
const CardsGalleryGrid = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-grid"),
  { ssr: false }
);

type CardsGalleryGridWrapperProps = {
  initialCards: CardsDTO;
  filter: string;
  sort: string;
  order: "asc" | "desc";
};

export default function CardsGalleryGridWrapper({
  initialCards,
  filter,
  sort,
  order,
}: CardsGalleryGridWrapperProps) {
  const [cards, setCards] = useState(initialCards);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  async function loadMoreCards(startIndex: number, stopIndex: number) {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);

    const limit = stopIndex - startIndex + 1;
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      sort: sort,
      order: order,
    });

    // Only add filter if it's not "all"
    if (filter && filter !== "all") {
      queryParams.set("filter", filter);
    }

    try {
      const response = await fetch(`/api/data/fetch-cards?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch more cards");
      }

      const newCards = await response.json();

      if (newCards && newCards.length > 0) {
        setCards((prevCards) => {
          const existingCardIds = new Set(prevCards.map((card) => card.id));
          const filteredNewCards = newCards.filter(
            (card: CardDTO) => !existingCardIds.has(card.id)
          );
          return [...prevCards, ...filteredNewCards];
        });
        setHasNextPage(newCards.length === limit);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching more cards:", error);
      setHasNextPage(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CardsGalleryGrid
      cards={cards}
      loadMoreCards={loadMoreCards}
      hasNextPage={hasNextPage}
    />
  );
}
