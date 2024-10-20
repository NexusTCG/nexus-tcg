import React from "react";
// Utils
import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
// Custom components
import CardsGallerySearchbar from "@/components/cards-gallery/cards-gallery-searchbar";
import CardsGallerySortFilter from "@/components/cards-gallery/cards-gallery-sort-filter-options";
import CardsGalleryPagination from "@/components/cards-gallery/cards-gallery-pagination";

type CardsGalleryHeaderProps = {
  search: string;
  sort: string;
  order: string;
  filter: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
};

export default function CardsGalleryHeader({
  search,
  sort,
  order,
  filter,
  totalResults,
  currentPage,
  totalPages,
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
          gap-4
        "
      >
        <CardsGallerySearchbar initialSearch={search} />
        <Link href="/cards/create">
          <Button className="min-w-24">Create a card</Button>
        </Link>
      </div>
      <div
        id="cards-gallery-header-actions-container"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
          gap-8
        "
      >
        <div
          id="cards-gallery-results-sort-filter-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-4
          "
        >
          <small className="min-w-16">{totalResults} results</small>
          <CardsGallerySortFilter sort={sort} order={order} filter={filter} />
        </div>
        <CardsGalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
