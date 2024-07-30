import React from "react";
// Custom components
import CreateProfileForm from "@/components/login/create-profile-form";
import ErrorAlertWrapper from "@/components/login/error-alert-wrapper";

export default async function CreateProfile({
  searchParams,
}: {
  searchParams: { 
    [key: string]: string | string[] | undefined 
  }
}) {
  const error = searchParams.error as string | undefined;
  const fullName = searchParams.full_name as string | undefined;
  const avatarUrl = searchParams.avatar_url as string | undefined;
  const userId = searchParams.user_id as string | undefined;

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
        <ErrorAlertWrapper error={error} />
        <CreateProfileForm
          userId={userId}
          fullName={fullName}
          avatarUrl={avatarUrl}
        />
      </div>
    </div>
  );
}