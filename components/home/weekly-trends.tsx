"use client";

import React from "react";
// Utils
import Link from "next/link";
// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  Bar, 
  BarChart, 
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { cardType: "agent", cards: 275, fill: "var(--color-agent)" },
  { cardType: "event", cards: 200, fill: "var(--color-event)" },
  { cardType: "software", cards: 187, fill: "var(--color-software)" },
  { cardType: "hardware", cards: 173, fill: "var(--color-hardware)" },
]

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
  hardware: {
    label: "Hardware",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function WeeklyTrends() {
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
          Trends this week
        </CardTitle>
        <Link
          href="/create"
          className="text-sm opacity-50 hover:opacity-80"
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