import React from "react";
// Utils
import Link from "next/link";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Custom components
import CardThumbnail from "@/components/cards-gallery/card-thumbnail";

export default async function LatestCards() {
  const cards = await getCardsDTO({
    limit: 4,
    order: { column: "id", direction: "desc" },
  });

  return (
    <Card
      className="
        w-full 
        border 
        border-zinc-700 
        overflow-hidden
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
            opacity-50 
            hover:opacity-80
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
            gap-2
          "
        >
          {cards?.map((card) => (
            <CardThumbnail
              key={card.id}
              cardRender={card.initialMode.render}
              cardName={card.initialMode.name}
              cardId={card.id}
              width={"md"}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
