import React from "react";
// Utils
import Link from "next/link";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// Custom components
import TopCardRow from "@/components/home/top-card-row";

type TopCardsProps = {
  topCards: CardDTO[];
};

export default function TopCards({ topCards }: TopCardsProps) {
  return (
    <Card className="w-full">
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
        <CardTitle className="text-lg">Top cards this week</CardTitle>
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
          Vote on cards
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          overflow-hidden
          px-0
          pb-0
          rounded-b-md
        "
      >
        {topCards.map((card, index) => (
          <React.Fragment key={card.id}>
            <TopCardRow
              rank={index + 1}
              cardName={card.initialMode.name}
              votes={card.votes || 0}
              currentUserVoted={false} // TODO: Implement user voting status
              creator={card.username || "Username"}
              createdAt={card.created_at || ""}
            />
            {index < topCards.length - 1 && (
              <Separator orientation="horizontal" />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
