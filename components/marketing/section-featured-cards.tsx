import React from "react";
// Utils
import Link from "next/link";
import clsx from "clsx";
// Server
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Custom components
import SectionContainer from "@/components/marketing/section-container";
import CardThumbnail from "@/components/cards-gallery/card-thumbnail";

export default async function SectionFeaturedCards() {
  const cards = await getCardsDTO({
    limit: 3,
    filters: {
      approved: true,
    },
    order: { column: "id", direction: "desc" },
  });

  return (
    <SectionContainer label="featured-cards" bgImage size="md">
      <div
        id="featured-cards-container"
        className="
          flex
          flex-row
          justify-center
          lg:justify-between
          gap-8
          items-center
          w-full
        "
      >
        {cards?.map((card, index) => (
          <div
            key={card.id}
            id={`featured-card-${card.id}-container`}
            className={clsx("flex-col justify-center items-center gap-2", {
              "hidden lg:flex": index === 2,
              "hidden md:flex": index === 1,
            })}
          >
            <CardThumbnail
              cardRender={card.initialMode.render}
              cardName={card.initialMode.name}
              cardId={card.id}
              width={"md"}
            />
            <div
              id={`featured-card-${card.id}-info-container`}
              className="
                flex
                flex-row
                justify-center
                items-center
                text-baseline
                gap-2
              "
            >
              <Link href={`/cards/${card.id}`}>
                <h4
                  className="
                    font-medium
                    hover:underline
                    hover:text-teal-400
                  "
                >
                  {card.initialMode.name}
                </h4>
              </Link>
              <small className="text-neutral-300 text-sm">by</small>
              <small className="text-white">{card.username}</small>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
