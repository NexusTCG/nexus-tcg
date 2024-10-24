import React from "react";
// Utils
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Custom components
import ProfileHeader from "@/components/profile/profile-header";
import CardsGallery from "@/components/cards-gallery/cards-gallery";

export default async function Profile({
  params,
  searchParams,
}: {
  params: {
    profile: string;
  };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // This component is responsible for fetching user data based on username
  // Then cross-referencing it with the authenticated user's profile
  // It also handles the search parameters for the cards gallery

  // Destructure search parameters
  let search = (await searchParams).search;
  let sort = (await searchParams).sort;
  let order = (await searchParams).order;
  let filter = (await searchParams).filter;

  // Convert search parameters to strings
  search = search?.toString() ?? "";
  sort = sort?.toString() ?? "";
  order = order?.toString() ?? "asc";
  filter = filter?.toString() ?? "all";

  // Destructure params to get username
  const { profile } = params;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let userProfile = null;
  let currentUserProfile = null;
  let isCurrentUserProfile = false;

  try {
    // Fetch user data based on username
    const userProfileData = await supabase
      .from("profiles")
      .select("*")
      .eq("username", profile);

    // Fetch user profile
    currentUserProfile = await getUserProfileDTO(); // TODO: Update DTO to also be able to fetch by username?

    // Check if profile is authenticated user's profile
    if (currentUserProfile?.username === profile) {
      isCurrentUserProfile = true;
      userProfile = currentUserProfile;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  if (!userProfile) return null;

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
        <CardsGallery
          search={search}
          sort={sort}
          order={order as "asc" | "desc"}
          filter={filter}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
}
