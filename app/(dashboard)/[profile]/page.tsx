import React from "react";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Custom components
import ProfileHeader from "@/components/profile/profile-header";
import CardsGallery from "@/components/cards-gallery/cards-gallery";
import CardsGalleryHeader from "@/components/cards-gallery/cards-gallery-header";

export default async function Profile({
  params,
  searchParams,
}: {
  params: {
    profile: string;
  };
  searchParams: {
    search?: string;
    sort?: string;
    order?: string;
    filter?: string;
    page?: string;
  };
}) {
  const { profile } = params;

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

  let userProfile = null;
  let isCurrentUserProfile = false;
  let userCards = null;

  try {
    userProfile = await getUserProfileDTO();

    if (userProfile?.username === profile) {
      isCurrentUserProfile = true;
    }
    const filters: {
      type?: string;
      name?: string;
      user_id?: string;
    } = {};
    if (userProfile?.user_id) {
      filters.user_id = userProfile.user_id;
    }
    if (filter !== "all") filters.type = filter;
    if (search) filters.name = search;

    userCards = await getCardsDTO({
      limit: pageSize,
      filters,
      order: {
        column: sort,
        direction: order as "asc" | "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  if (!userProfile) {
    return <div>This profile does not exist.</div>;
  }

  const totalCards = userCards?.length || 0;

  return (
    <div
      id={`${profile}-page-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        px-4
        md:px-8
        py-4
        gap-4
      "
    >
      <div
        id={`${profile}-page-content-container`}
        className="
          flex 
          flex-col 
          justify-start 
          items-center 
          w-full
          sm:border 
          border-zinc-700 
          sm:rounded-sm 
          overflow-hidden
          pb-4
        "
      >
        <ProfileHeader
          profile={userProfile}
          isCurrentUserProfile={isCurrentUserProfile}
        />
      </div>
      <div
        id={`${profile}-page-cards-container`}
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
          id={`${profile}-page-cards-gallery-container`}
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
          {userCards && <CardsGallery cards={userCards} />}
        </div>
      </div>
    </div>
  );
}
