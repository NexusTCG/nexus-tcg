// "use client";

// import React from "react";
// // Components
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";

// const chartConfig = {
//   cards: {
//     label: "Cards",
//   },
//   agent: {
//     label: "Agent",
//     color: "hsl(var(--chart-1))",
//   },
//   event: {
//     label: "Event",
//     color: "hsl(var(--chart-2))",
//   },
//   software: {
//     label: "Software",
//     color: "hsl(var(--chart-3))",
//   },
//   software_agent: {
//     label: "Software Agent",
//     color: "hsl(var(--chart-3))",
//   },
//   hardware: {
//     label: "Hardware",
//     color: "hsl(var(--chart-4))",
//   },
//   hardware_agent: {
//     label: "Hardware Agent",
//     color: "hsl(var(--chart-4))",
//   },
// } satisfies ChartConfig;

// type WeeklyTrendsChartProps = {
//   chartData: {
//     cardType: string;
//     cards: number;
//     fill: string;
//   }[];
// };

// export default function WeeklyTrendsChart({
//   chartData,
// }: WeeklyTrendsChartProps) {
//   return (
//     <ChartContainer
//       config={chartConfig}
//       className="min-h-[200px] max-h-[240px] w-full"
//     >
//       <BarChart
//         accessibilityLayer
//         data={chartData}
//         layout="vertical"
//         margin={{
//           left: 20,
//         }}
//       >
//         <YAxis
//           dataKey="cardType"
//           type="category"
//           tickLine={false}
//           tickMargin={10}
//           axisLine={false}
//           tickFormatter={(value) =>
//             chartConfig[value as keyof typeof chartConfig]?.label
//           }
//         />
//         <XAxis dataKey="cards" type="number" hide />
//         <ChartTooltip
//           cursor={false}
//           content={<ChartTooltipContent hideLabel />}
//         />
//         <Bar dataKey="cards" layout="vertical" radius={5} />
//       </BarChart>
//     </ChartContainer>
//   );
// }
