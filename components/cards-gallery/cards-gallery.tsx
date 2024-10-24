import React from "react";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Custom components
import CardsGalleryHeader from "@/components/cards-gallery/cards-gallery-header";
import CardsGalleryGridWrapper from "@/components/cards-gallery/cards-gallery-grid-wrapper";

type CardsGalleryProps = {
  search: string;
  sort: string | "created_at";
  order: "asc" | "desc";
  filter: string | "all";
  userProfile?: ProfileDTO | null;
};

export default async function CardsGallery({
  search,
  sort,
  order,
  filter,
  userProfile,
}: CardsGalleryProps) {
  // This component is responsible for fetching cards based on the search parameters
  // And filtering for a specific user's cards if a user's data is passed as props
  // Then passing the search parameters and amount of cards to the gallery header
  // And passing the cards to the gallery grid

  const limit = 20;

  // Define filters
  const filters: { type?: string; name?: string; username?: string } = {};
  if (userProfile?.username) {
    filters.username = userProfile.username;
  }
  if (filter !== "all" && typeof filter === "string") {
    filters.type = filter;
  }

  // Define search
  if (search && typeof search === "string") {
    filters.name = search;
  }

  // Fetch cards
  const initialCards = await getCardsDTO({
    limit,
    filters,
    order: {
      column: sort as string,
      direction: order as "asc" | "desc",
    },
  });

  return (
    <div
      id="cards-gallery-container"
      className="
        flex 
        flex-col 
        justify-center 
        items-start 
        w-full 
        sm:border 
        border-zinc-700 
        sm:rounded-sm 
        overflow-hidden
      "
    >
      <CardsGalleryHeader
        search={search}
        sort={sort}
        order={order}
        filter={filter}
        totalResults={initialCards?.length || 0}
      />
      <CardsGalleryGridWrapper
        initialCards={initialCards || []}
        filters={filters}
        sort={sort}
        order={order}
      />
    </div>
  );
}
