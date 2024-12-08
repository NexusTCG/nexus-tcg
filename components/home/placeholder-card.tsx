import React from "react";
// Utils
import Link from "next/link";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlaceholderCardProps = {
  card: "weekly-trends" | "latest-cards";
};

const cardPlaceholderText = {
  "weekly-trends": {
    title: "Trends this week",
    cta: "Create the first card of the week.",
    hrefText: "Create a card",
    href: "/create",
  },
  "latest-cards": {
    title: "Latest cards",
    cta: "Create the first card of the week.",
    hrefText: "Create a card",
    href: "/create",
  },
};

export default function PlaceholderCard({ card }: PlaceholderCardProps) {
  return (
    <Card className="w-full border border-zinc-700 overflow-hidden">
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
        <CardTitle className="text-lg">
          {cardPlaceholderText[card].title}
        </CardTitle>
        <Link
          href={cardPlaceholderText[card].href}
          className="
            text-sm
            text-muted-foreground
            hover:text-foreground
            transition-colors
            duration-300
            whitespace-pre-line
          "
        >
          {cardPlaceholderText[card].hrefText}
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          min-h-[280px]
        "
      >
        <Link
          href={cardPlaceholderText[card].href}
          className="
            hover:underline
            text-muted-foreground
            hover:text-foreground
            text-sm
            font-normal
            animate-pulse
            hover:animate-none
            transition-all
          "
        >
          {cardPlaceholderText[card].cta}
        </Link>
      </CardContent>
    </Card>
  );
}
