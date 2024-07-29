import React from "react";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Custom components
import CreateProfileForm from "@/components/login/create-profile-form";

export default async function CreateProfile() {
  const userProfile: ProfileDTO | null = await getUserProfileDTO();

  return (
    <div
      id="create-profile-page-container"
      className="
        flex
        flex-col
        flex-grow
        justify-center
        items-center
        w-full
        h-full
        pb-24
      "
    >
      <div
        id="create-profile-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          max-w-[480px]
          w-full
        "
      >
        <CreateProfileForm initialProfile={userProfile} />
      </div>
    </div>
  );
}