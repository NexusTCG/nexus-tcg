import React from "react";
// Utils
import { calculateTimeAgo } from "@/app/utils/actions/actions";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
// Custom components
import UserAvatar from "@/components/user-avatar";
// Icons
import { MdOutlineReport, MdOutlineEdit } from "react-icons/md";

type ProfileHeaderProps = {
  profile: ProfileDTO | null;
  isCurrentUserProfile: boolean;
};

export default function ProfileHeader({
  profile,
  isCurrentUserProfile,
}: ProfileHeaderProps) {
  return (
    <div
      id="profile-header-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        p-4
        gap-4
      "
    >
      <div
        id="profile-header-avatar-username-cta-container"
        className="
          flex
          flex-row
          justify-between
          items-center
          w-full
        "
      >
        <div
          id="profile-header-avatar-username-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-2
          "
        >
          <UserAvatar
            avatarUrl={profile?.avatar_url ?? undefined}
            userName={profile?.username ?? undefined}
            size={"2xl"}
          />
          <div
            id="profile-header-username-container"
            className="
              flex
              flex-col
              justify-start
              items-start
              gap-2
            "
          >
            <div
              className="
                flex
                flex-row
                justify-start
                items-center
                gap-2
              "
            >
              <h1>{profile?.username}</h1>
              <div
                className="
                  flex
                  flex-row
                  justify-start
                  items-center
                  gap-1
                "
              >
                {/* TODO: Add functionality to open report modal --> Send email to admin */}
                {!isCurrentUserProfile && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdOutlineReport
                          className="
                            w-[1rem] 
                            h-[1rem] 
                            text-muted-foreground 
                            hover:text-foreground 
                            hover:cursor-pointer
                            transition-colors 
                            duration-300
                          "
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        {profile?.username} causing problems? File a report.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {/* TODO: Add functionality to open edit profile modal --> Edit profile form */}
                {isCurrentUserProfile && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdOutlineEdit
                          className="
                            w-[1rem] 
                            h-[1rem] 
                            text-muted-foreground 
                            hover:text-foreground 
                            hover:cursor-pointer
                            transition-colors 
                            duration-300
                          "
                        />
                      </TooltipTrigger>
                      <TooltipContent>Edit profile</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            {profile?.created_at && (
              <small className="text-muted-foreground">
                Joined {calculateTimeAgo(profile.created_at)}
              </small>
            )}
          </div>
        </div>
        <Button>CTA Message</Button>
      </div>
      <div
        id="profile-header-bio-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
        "
      >
        <p>
          {profile?.bio
            ? profile.bio
            : `${profile?.username} has no bio yet...`}
        </p>
      </div>
    </div>
  );
}
