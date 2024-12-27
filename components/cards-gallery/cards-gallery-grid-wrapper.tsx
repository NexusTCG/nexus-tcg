"use client";

import React, { useState, useEffect } from "react";
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
  type: string;
  energy: string;
  grade: string;
  approvedOnly: string;
  sort: string;
  order: "asc" | "desc";
  from: string;
};

export default function CardsGalleryGridWrapper({
  initialCards,
  type,
  energy,
  grade,
  approvedOnly,
  sort,
  order,
  from,
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
      from: from,
    });

    // Only add filter if it's not "all"
    if (type && type !== "all") {
      queryParams.set("type", type);
    }
    if (energy && energy !== "all") {
      queryParams.set("energy", energy);
    }
    if (grade && grade !== "all") {
      queryParams.set("grade", grade);
    }
    if (approvedOnly && approvedOnly !== "false") {
      queryParams.set("approvedOnly", approvedOnly);
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

  // Reset cards and hasNextPage when sort, order, or filter changes
  useEffect(() => {
    setCards(initialCards);
    setHasNextPage(true);
  }, [initialCards, sort, order, type, energy, grade, approvedOnly]);

  return (
    <CardsGalleryGrid
      cards={cards}
      loadMoreCards={loadMoreCards}
      hasNextPage={hasNextPage}
    />
  );
}
