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
  type: string | "all";
  energy: string | "all";
  grade: string | "all";
  approvedOnly: string | "false";
  from: string | "week";
  // userProfile?: ProfileDTO | null;
};

export default async function CardsGallery({
  search,
  sort,
  order,
  type,
  energy,
  grade,
  approvedOnly,
  from,
}: // userProfile,
CardsGalleryProps) {
  const limit = 1000; // TODO: Add virtual scrolling

  // Construct query parameters
  const queryParams = new URLSearchParams();

  // Add limit to query param
  queryParams.set("limit", limit.toString());

  // Add search to query param
  if (search) queryParams.set("search", search);

  // Add filter to query param
  if (type && type !== "all") queryParams.set("type", type);
  if (energy && energy !== "all") queryParams.set("energy", energy);
  if (grade && grade !== "all") queryParams.set("grade", grade);
  if (approvedOnly && approvedOnly !== "false")
    queryParams.set("approvedOnly", approvedOnly);

  // Add sort and order to query param
  queryParams.set("sort", sort || "id");
  queryParams.set("order", order || "desc");

  // Add from to query param
  if (from && from !== "all") queryParams.set("from", from);

  // Why do we need username?
  // if (userProfile?.username) {
  //   queryParams.set("username", userProfile.username);
  // }

  // Fetch cards by query parameters
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/data/fetch-cards?${queryParams}`,
    {
      cache: "no-store",
    }
  );

  const cardsData = (await data.json()) || [];

  return (
    <div
      id="cards-gallery-container"
      className="
        flex 
        flex-col 
        justify-start 
        items-start 
        w-full 
        min-h-screen
        overflow-hidden
        bg-zinc-800
      "
    >
      <CardsGalleryHeader
        search={search}
        sort={sort}
        order={order}
        type={type}
        energy={energy}
        grade={grade}
        approvedOnly={approvedOnly}
        from={from}
        totalResults={cardsData?.length || 0}
      />
      {cardsData?.length > 0 ? (
        <CardsGalleryGridWrapper
          initialCards={cardsData}
          type={type}
          energy={energy}
          grade={grade}
          approvedOnly={approvedOnly}
          sort={sort}
          order={order}
          from={from}
        />
      ) : (
        <div
          className="
            w-full
            flex-1
            px-4
            z-10
            relative
          "
        ></div>
      )}
    </div>
  );
}
