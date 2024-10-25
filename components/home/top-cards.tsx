import React from "react";
// Utils
import Link from "next/link";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// Custom components
import TopCardRow from "@/components/home/top-card-row";

export default function TopCards() {
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
        {/* TODO: Fetch top cards and render each as a row */}
        <TopCardRow
          rank={1}
          cardName="Blacker Lotus"
          votes={99}
          currentUserVoted={false}
          creator="Username"
          createdAt="99 days"
        />
        <Separator orientation="horizontal" />
        <TopCardRow
          rank={2}
          cardName="Time Moonwalk"
          votes={99}
          currentUserVoted={true}
          creator="Username"
          createdAt="99 days"
        />
        <Separator orientation="horizontal" />
        <TopCardRow
          rank={3}
          cardName="Spacetime Twister"
          votes={99}
          currentUserVoted={false}
          creator="Username"
          createdAt="99 days"
        />
      </CardContent>
    </Card>
  );
}
