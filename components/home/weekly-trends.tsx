"use client";

import React, { useMemo } from "react";
// Utils
import Link from "next/link";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  cards: {
    label: "Cards",
  },
  agent: {
    label: "Agent",
    color: "hsl(var(--chart-1))",
  },
  event: {
    label: "Event",
    color: "hsl(var(--chart-2))",
  },
  software: {
    label: "Software",
    color: "hsl(var(--chart-3))",
  },
  software_agent: {
    label: "Software Agent",
    color: "hsl(var(--chart-3))",
  },
  hardware: {
    label: "Hardware",
    color: "hsl(var(--chart-4))",
  },
  hardware_agent: {
    label: "Hardware Agent",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type WeeklyTrendsProps = {
  cardTypes: string[];
  cardTypeCounts: Record<string, number>;
};

export default function WeeklyTrends({
  cardTypes,
  cardTypeCounts,
}: WeeklyTrendsProps) {
  const chartData = useMemo(() => {
    return cardTypes.map((cardType) => ({
      cardType,
      cards: cardTypeCounts[cardType],
      fill: `var(--color-${cardType.replace("_", "-")})`,
    }));
  }, [cardTypes, cardTypeCounts]);

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
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-[240px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <YAxis
              dataKey="cardType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="cards" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cards" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
