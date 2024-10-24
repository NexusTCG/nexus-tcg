import React from "react";
// Utils
import dynamic from "next/dynamic";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Custom components
const CardsGalleryHeader = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-header"),
  { ssr: false }
);
const CardsGalleryGridWrapper = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-grid-wrapper"),
  { ssr: false }
);

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
      column: sort || "created_at",
      direction: order || "desc",
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
