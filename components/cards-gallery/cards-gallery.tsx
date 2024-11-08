import React from "react";
// Utils
import dynamic from "next/dynamic";
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
  // userProfile?: ProfileDTO | null;
};

export default async function CardsGallery({
  search,
  sort,
  order,
  filter,
}: // userProfile,
CardsGalleryProps) {
  const limit = 20;

  // Construct query parameters
  const queryParams = new URLSearchParams();
  queryParams.set("limit", limit.toString());

  if (search) queryParams.set("search", search);

  if (filter && filter !== "all") queryParams.set("filter", filter);

  // Add sort and order
  queryParams.set("sort", sort || "id");
  queryParams.set("order", order || "desc");

  // Why do we need username?
  // if (userProfile?.username) {
  //   queryParams.set("username", userProfile.username);
  // }

  // Fetch cards by query parameters
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/data/fetch-cards?${queryParams}`,
    {
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    }
  );

  const cardsData = (await data.json()) || [];

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
        totalResults={cardsData?.length || 0}
      />
      <CardsGalleryGridWrapper
        initialCards={cardsData}
        filter={filter}
        sort={sort}
        order={order}
      />
    </div>
  );
}
