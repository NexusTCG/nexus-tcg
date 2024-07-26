import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Custom components
import SectionContainer from "@/components/marketing/section-container";

// TODO: Fetch cards from database
// TODO: Add dynamic link to card page
const dynamicCardUrl = "/cards/1"

type FeaturedCardProps = {
  name: string;
  creator: string;
  imageUrl: string;
};

function FeaturedCard({ 
  name, 
  creator, 
  imageUrl 
}: FeaturedCardProps) {
  return (
    <div
      id="featured-card-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-[240px]
        height-[336px]
        gap-4
      "
    >
      <Image
        src={imageUrl}
        alt={`${name} by ${creator}`}
        width={240}
        height={336}
        className="
          rounded-md
          shadow-md
          shadow-black/50
        "
      />
      <div
        id="card-info"
        className="
          flex
          flex-row
          justify-center
          items-center
          text-baseline
          gap-1
        "
      >
        <Link href={dynamicCardUrl}>
          <h4
            className="
              font-medium
              hover:underline
              hover:text-teal-400
            "
          >
            {name}
          </h4>
        </Link>
        <p className="text-neutral-300 text-sm">by</p>
        <p className="text-white">{creator}</p>
      </div>
    </div>
  );
}

export default function SectionFeaturedCards() {
  const cards = [
    { name: "Card Name 1", creator: "John Deer", imageUrl: "/images/card-placeholder.png" },
    { name: "Card Name 2", creator: "John Deer", imageUrl: "/images/card-placeholder.png" },
    { name: "Card Name 3", creator: "John Deer", imageUrl: "/images/card-placeholder.png" },
  ];

  return (
    <SectionContainer
      label="featured-cards"
      bgImage
      size="md"
    >
      <div
        id="featured-cards-container"
        className="
          flex
          flex-row
          justify-center
          md:justify-between
          gap-8
          items-center
          w-full
        "
      >
        <div className="flex">
          <FeaturedCard
            name={cards[0].name}
            creator={cards[0].creator}
            imageUrl={cards[0].imageUrl}
          />
        </div>
        <div className="hidden md:flex">
          <FeaturedCard
            name={cards[0].name}
            creator={cards[0].creator}
            imageUrl={cards[0].imageUrl}
          />
        </div>
        <div className="hidden sm:flex">
          <FeaturedCard
            name={cards[0].name}
            creator={cards[0].creator}
            imageUrl={cards[0].imageUrl}
          />
        </div>
      </div>
    </SectionContainer>
  );
}