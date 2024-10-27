import React from "react";
// Utils
import Link from "next/link";
// Types
import { CardsDTO } from "@/app/lib/types/dto";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Custom components
import WeeklyTrendsChart from "@/components/home/weekly-trends-chart";
import PlaceholderCard from "@/components/home/placeholder-card";

export default async function WeeklyTrends() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/data/cards/weekly-trends`
  );

  const data = await response.json();

  // Check if data is an array (cards were found)
  const cards: CardsDTO = Array.isArray(data) ? data : [];

  // If no cards were found, return placeholder card
  if (!cards || cards.length === 0) {
    return <PlaceholderCard card="weekly-trends" />;
  }

  // Count the number of cards for each type
  const typeCounts: Record<string, number> = cards.reduce(function (
    acc: Record<string, number>,
    card: { initialMode: { type: string } }
  ) {
    const type = card.initialMode.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>);

  // Filter out types with no cards created this week
  const cardTypes: string[] = Object.entries(typeCounts)
    .filter(([_, count]) => count > 0)
    .map(([type]) => type);

  // Map the card types to the chart data
  const chartData = cardTypes.map((cardType) => ({
    cardType: cardType,
    cards: typeCounts[cardType as keyof typeof typeCounts],
    fill: `var(--color-${cardType.replace("_", "-")})`,
  }));

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
        <CardTitle className="text-lg">Trends this week</CardTitle>
        <Link
          href="/create"
          className="
            text-sm
            text-muted-foreground
            hover:text-foreground
            transition-colors
            duration-300
          "
        >
          Create card
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          p-4
          pb-6
          gap-4
        "
      >
        <WeeklyTrendsChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}
