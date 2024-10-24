"use client";

import React, { useState } from "react";
// Types
import { CardsDTO } from "@/app/lib/types/dto";
// Components
import CardsGalleryGrid from "@/components/cards-gallery/cards-gallery-grid";

type CardsGalleryGridWrapperProps = {
  initialCards: CardsDTO;
  filters: { type?: string; name?: string; username?: string };
  sort: string;
  order: "asc" | "desc";
};

export default function CardsGalleryGridWrapper({
  initialCards,
  filters,
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

    try {
      const response = await fetch(
        `/api/data/fetch-cards?${new URLSearchParams({
          limit: limit.toString(),
          filters: JSON.stringify(filters),
          order: JSON.stringify({ column: sort, direction: order }),
        })}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more cards");
      }

      const newCards = await response.json();

      if (newCards && newCards.length > 0) {
        setCards((prevCards) => [...prevCards, ...newCards]);
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
