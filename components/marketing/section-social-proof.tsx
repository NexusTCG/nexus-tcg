import React from "react";
// Utils
import Link from "next/link";
// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// Custom components
import SectionContainer from "@/components/marketing/section-container";

// TODO: Fetch usernames' testimonials from Supabase
// TODO: Add url to username profile
const usernamePlaceholder = "Nexus_Nils"
const profileUrlPlaceholder = "/profile/1"
const avatarUrlPlaceholder = "https://github.com/shadcn.png"

type TestimonialProps = {
  quote: string;
  username: string;
  usernameAbbreviation: string;
  avatarUrl: string;
  profileUrl: string;
};

function Testimonial({ 
  quote, 
  username,
  usernameAbbreviation,
  avatarUrl,
  profileUrl,
}: TestimonialProps) {
  return (
    <div
      id="testimonial-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        p-6
        pb-8
        rounded-lg
        border
        max-w-[300px]
        gap-8
      "
    >
      <p
        className="
          text-md
          text-white
          italic
        "
      >
        "{quote}"
      </p>
      <div
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-4
        "
      >
        <Avatar className="w-[32px] h-[32px]">
          <AvatarImage
            src={avatarUrl}
            alt={`${username} avatar`}
          />
          <AvatarFallback>
            {usernameAbbreviation}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href={profileUrl}>
            <p 
              className="
                text-neutral-200
                font-medium
                hover:text-teal-400
                hover:underline
              "
            >
              {username}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SectionSocialProof() {
  const testimonials = [
      {
        quote: "Some quote from someone who really likes Nexus",
        username: usernamePlaceholder,
        usernameAbbreviation: usernamePlaceholder.slice(0, 2),
        profileUrl: profileUrlPlaceholder,
        avatarUrl: avatarUrlPlaceholder,
      },
      {
        quote: "Some quote from someone who really likes Nexus",
        username: usernamePlaceholder,
        usernameAbbreviation: usernamePlaceholder.slice(0, 2),
        profileUrl: profileUrlPlaceholder,
        avatarUrl: avatarUrlPlaceholder,
      },
      {
        quote: "Some quote from someone who really likes Nexus",
        username: usernamePlaceholder,
        usernameAbbreviation: usernamePlaceholder.slice(0, 2),
        profileUrl: profileUrlPlaceholder,
        avatarUrl: avatarUrlPlaceholder,
      },
      {
        quote: "Some quote from someone who really likes Nexus",
        username: usernamePlaceholder,
        usernameAbbreviation: usernamePlaceholder.slice(0, 2),
        profileUrl: profileUrlPlaceholder,
        avatarUrl: avatarUrlPlaceholder,
      },
      {
        quote: "Some quote from someone who really likes Nexus",
        username: usernamePlaceholder,
        usernameAbbreviation: usernamePlaceholder.slice(0, 2),
        profileUrl: profileUrlPlaceholder,
        avatarUrl: avatarUrlPlaceholder,
      },
    ];

  return (
    <SectionContainer
      label="social-proof"
      size="sm"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="
          w-full
          items-center
          justify-center
          max-w-sm 
          sm:max-w-xl 
          md:max-w-3xl 
          lg:max-w-5xl 
          xl:max-w-6xl
        "
      >
        <CarouselContent
          className="
            -ml-2 
            md:-ml-4
          "
        >
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="
                pl-2 
                md:pl-4 
                basis-full 
                sm:basis-1/2 
                md:basis-1/3 
                lg:basis-1/4
              "
            >
              <Testimonial {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
}