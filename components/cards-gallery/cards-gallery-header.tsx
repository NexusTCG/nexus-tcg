import React from "react";
// Utils
import Link from "next/link";
import dynamic from "next/dynamic";
// Components
import { Button } from "@/components/ui/button";
// Custom components
const CardsGallerySearchbar = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-searchbar")
);
const CardsGallerySortFilter = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-sort-filter-options")
);

type CardsGalleryHeaderProps = {
  search: string;
  sort: string;
  order: string;
  filter: string;
  from: string;
  totalResults: number;
};

export default function CardsGalleryHeader({
  search,
  sort,
  order,
  filter,
  from,
  totalResults,
}: CardsGalleryHeaderProps) {
  return (
    <div
      id="cards-gallery-header"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        p-4
        gap-4
        border-b
        border-zinc-700
      "
    >
      <div
        id="cards-gallery-header-search-create-container"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          md:gap-8
          gap-4
        "
      >
        <CardsGallerySearchbar
          totalResults={totalResults}
          initialSearch={search}
        />
        <Link href="/create" className="hidden md:block">
          <Button className="min-w-24">Create a card</Button>
        </Link>
      </div>
      <div
        id="cards-gallery-results-sort-filter-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          gap-4
        "
      >
        <small className="text-xs whitespace-nowrap">
          {totalResults} <span className="text-muted-foreground">results</span>
        </small>
        <CardsGallerySortFilter
          sort={sort}
          order={order}
          filter={filter}
          from={from}
        />
      </div>
    </div>
  );
}
