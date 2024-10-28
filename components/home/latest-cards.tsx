import React from "react";
// Utils
import Link from "next/link";
import dynamic from "next/dynamic";
import clsx from "clsx";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Custom components
const CardThumbnail = dynamic(
  () => import("@/components/cards-gallery/card-thumbnail")
);

export default async function LatestCards() {
  const latestCards = await getCardsDTO({
    order: { column: "created_at", direction: "desc" },
    limit: 5,
  });

  if (!latestCards || latestCards.length === 0) return null;

  return (
    <Card
      className="
        w-full 
        border 
        border-zinc-700 
        overflow-hidden
        scrollbar-hide
      "
    >
      <CardHeader
        className="
          flex
          flex-row
          justify-between
          items-center
          border-b 
          border-zinc-700 
          py-3
          px-4
        "
      >
        <CardTitle className="text-lg">Latest cards</CardTitle>
        <Link
          href="/cards"
          className="
            text-sm
            text-muted-foreground
            hover:text-foreground
            transition-colors
            duration-300
          "
        >
          More cards
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          pt-6
          gap-2
          overflow-auto
          bg-zinc-800
          pr-0
          rounded-b-md
        "
      >
        <div
          id="latest-cards-container"
          className="
            flex
            flex-row
            justify-start
            items-center
          "
        >
          {latestCards?.map((card, index) => (
            <div
              key={card.id}
              className={clsx(
                "flex-shrink-0 transition-all duration-500 ease-in-out",
                {
                  "md:hover:mr-4 sm:hover:mr-2 xl:-mr-8 lg:-mr-12 md:-mr-16 sm:-mr-20 -mr-24":
                    index === 0,
                  "md:hover:ml-4 sm:hover:ml-2 xl:-ml-8 lg:-ml-12 md:-ml-16 sm:-ml-20 -ml-24":
                    index === latestCards.length - 1,
                  "md:hover:mx-4 sm:hover:mx-2 xl:-mx-8 lg:-mx-12 md:-mx-16 sm:-mx-20 -mx-24 group":
                    index > 0 && index < latestCards.length - 1,
                }
              )}
            >
              <CardThumbnail
                cardRender={card.initialMode.render}
                cardName={card.initialMode.name}
                cardId={card.id}
                width={"md"}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
