import React from "react";
import dynamic from "next/dynamic";
// Custom components
// const CardsGallerySearchbar = dynamic(
//   () => import("@/components/cards-gallery/cards-gallery-searchbar")
// );
const CardsGallerySortFilter = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-sort-filter-options")
);

type CardsGalleryHeaderProps = {
  search: string;
  sort: string;
  order: string;
  type: string;
  energy: string;
  grade: string;
  approvedOnly: string;
  from: string;
  totalResults: number;
};

export default function CardsGalleryHeader({
  search,
  sort,
  order,
  type,
  energy,
  grade,
  approvedOnly,
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
        border-b
        border-zinc-700
        bg-background
      "
    >
      {/* <CardsGallerySearchbar
        totalResults={totalResults}
        initialSearch={search}
      /> */}
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
          type={type}
          energy={energy}
          grade={grade}
          approvedOnly={approvedOnly}
          from={from}
        />
      </div>
    </div>
  );
}
