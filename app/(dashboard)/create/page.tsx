import React from "react";
// Server
import { getCurrentUserId } from "@/app/server/auth";
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Components
// import { Input } from "@/components/ui/input";
// Custom components
// import Banner from "@/components/banner";
import CardFormWrapper from "@/components/card-creator/card-form-wrapper";

export default async function Create() {
  let currentUserId = null;
  let userProfile = null;
  
  try {
    currentUserId = await getCurrentUserId();
    userProfile = await getUserProfileDTO();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  return (
    <div
      id="learn-page-container"
      className="
        flex
        flex-col
        md:flex-row
        justify-start
        items-start
        w-full
      "
    >
      <div
        id="learn-content-container"
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
        {/* <Banner
          message="This page is under construction."
          type="warning"
          autoExpire={true}
        /> */}
        <CardFormWrapper
          currentUserId={currentUserId}
          userProfile={userProfile}
        />
      </div>
      {/* <div
        id="nexus-chat-bot-container"
        className="
          hidden
          lg:flex
          flex-col
          justify-between
          items-center
          max-w-[360px]
          w-full
          h-screen
          p-4
          border-l
          border-zinc-700
          overflow
          sticky
          top-0
        "
      >
        <span>Chat bot</span>
        <span>Send Message</span>
        <Input type="text" placeholder="Your message" />
      </div> */}
    </div>
  )
}