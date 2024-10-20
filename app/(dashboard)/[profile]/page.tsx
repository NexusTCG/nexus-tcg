import React from "react";
// Server
import { getCurrentUserId } from "@/app/server/auth";
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Custom components
import ProfileHeader from "@/components/profile/profile-header";

export default async function Profile({
  params,
}: {
  params: {
    profile: string;
  };
}) {
  const { profile } = params;
  let currentUserId = null;
  let userProfile = null;
  let isCurrentUserProfile = false;

  try {
    currentUserId = await getCurrentUserId();
    userProfile = await getUserProfileDTO();

    if (userProfile?.username === profile) {
      isCurrentUserProfile = true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  if (!userProfile) {
    return <div>This profile does not exist.</div>;
  }

  // Check if profile matches authenticated user username
  // Enable edit profile button if it matches

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
        gap-8
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
          h-fulld
          border 
          border-zinc-700 
          rounded-sm 
          overflow-hidden
        "
      >
        <ProfileHeader
          profile={userProfile}
          isCurrentUserProfile={isCurrentUserProfile}
        />
      </div>
    </div>
  );
}
