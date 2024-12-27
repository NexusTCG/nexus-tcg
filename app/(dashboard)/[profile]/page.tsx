import React from "react";
// Utils
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Custom components
import ProfileHeader from "@/components/profile/profile-header";
import CardsGallery from "@/components/cards-gallery/cards-gallery";

export default async function Profile(props: {
  params: Promise<{
    profile: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  // Destructure search parameters
  let search = (await props.searchParams).search;
  let sort = (await props.searchParams).sort;
  let order = (await props.searchParams).order;
  let type = (await props.searchParams).type;
  let energy = (await props.searchParams).energy;
  let grade = (await props.searchParams).grade;
  let approvedOnly = (await props.searchParams).approvedOnly;
  let from = (await props.searchParams).from;

  // Convert search parameters to strings
  search = search?.toString() ?? "";
  sort = sort?.toString() ?? "created_at";
  order = order?.toString() ?? "asc";
  type = type?.toString() ?? "all";
  energy = energy?.toString() ?? "all";
  grade = grade?.toString() ?? "all";
  approvedOnly = approvedOnly?.toString() ?? "false";
  from = from?.toString() ?? "all";

  // Destructure params to get username
  const { profile } = params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let userProfile = null;
  let currentUserProfile = null;
  let isCurrentUserProfile = false;

  try {
    // Fetch user profile
    currentUserProfile = await getUserProfileDTO(); // TODO: Update DTO to also be able to fetch by username?

    // Check if profile is authenticated user's profile
    if (currentUserProfile?.username === profile) {
      isCurrentUserProfile = true;
      userProfile = currentUserProfile;
    } else {
      // Fetch user data based on username
      const userProfileData = await supabase
        .from("profiles")
        .select("*")
        .eq("username", profile);

      if (userProfileData.data && userProfileData.data.length > 0) {
        userProfile = userProfileData.data[0];
      }
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
          overflow-hidden
        "
      >
        <CardsGallery
          search={search}
          sort={sort}
          order={order as "asc" | "desc"}
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
