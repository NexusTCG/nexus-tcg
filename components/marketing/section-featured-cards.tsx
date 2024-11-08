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
    order: { column: "id", direction: "desc" },
    approvedOnly: true,
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
            className={clsx("flex flex-col justify-start items-center gap-2", {
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
                flex-col
                justify-center
                items-center
              "
            >
              <Link href={`/cards/${card.id}`}>
                <p className="font-medium hover:text-teal-400 transition-all duration-300">
                  {card.initialMode.name}
                </p>
              </Link>
              <div
                id={`featured-card-${card.id}-author-container`}
                className="
                  flex
                  flex-row
                  justify-center
                  items-center
                  gap-1
                  text-foreground-muted
                "
              >
                <small>by </small>
                <Link href={`/${card.username}`}>
                  <small className="hover:text-white hover:underline transition-all duration-300">
                    {card.username}
                  </small>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
