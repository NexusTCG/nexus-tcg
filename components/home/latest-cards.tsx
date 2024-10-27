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
              className={clsx("flex-shrink-0 transition-all duration-300", {
                "-ml-24 hover:-ml-12": index !== 0,
                "hover:ml-12": index === 0,
              })}
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
