import React from "react";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Custom components
import CardsGalleryHeader from "@/components/cards-gallery/cards-gallery-header";
import CardsGallery from "@/components/cards-gallery/cards-gallery";

export const dynamic = "force-dynamic";

export default async function Cards({
  searchParams,
}: {
  searchParams: {
    search?: string;
    sort?: string;
    order?: string;
    filter?: string;
    page?: string;
  };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "created_at";
  const order =
    typeof searchParams.order === "string" ? searchParams.order : "desc";
  const filter =
    typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const pageSize = 20;

  const filters: { type?: string; name?: string } =
    filter !== "all" ? { type: filter } : {};
  if (search) {
    filters.name = search;
  }

  const cards = await getCardsDTO({
    limit: pageSize,
    filters,
    order: { column: sort, direction: order as "asc" | "desc" },
  });

  const totalCards = cards?.length || 0;

  return (
    <div
      id="cards-page-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        px-0
        sm:px-4
        md:px-8
        py-4
        gap-8
      "
    >
      <div
        id="cards-page-content-container"
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
          totalResults={totalCards}
          currentPage={page}
          totalPages={Math.ceil(totalCards / pageSize)}
        />
        <div
          id="cards-gallery-container"
          className="
            flex 
            flex-col 
            justify-center 
            items-center 
            w-full 
            flex-grow
            p-4
            bg-zinc-800
            relative
          "
        >
          {cards && <CardsGallery cards={cards} />}
        </div>
      </div>
    </div>
  );
}
