import React, { Suspense } from "react";
// Utils
import dynamic from "next/dynamic";
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Dynamic custom components
const SteamWidget = dynamic(() => import("@/components/home/steam-widget"));
const LatestCards = dynamic(() => import("@/components/home/latest-cards"));
const QuickLearn = dynamic(() => import("@/components/home/quick-learn"));
const WeeklyTrends = dynamic(() => import("@/components/home/weekly-trends"));
const PlaceholderCard = dynamic(
  () => import("@/components/home/placeholder-card")
);

export default async function Home() {
  return (
    <div
      id="home-page-container"
      className="
        w-full
        px-4
        sm:px-6
        md:px-8
        py-4
      "
    >
      <div
        id="home-content-container"
        className="
          flex
          flex-col
          lg:flex-row
          max-w-full
          gap-4
        "
      >
        <div
          id="home-content-col-1"
          className="
            flex 
            flex-col 
            w-full 
            lg:w-2/3 
            gap-4
          "
        >
          <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            <LatestCards />
          </Suspense>
          <SteamWidget />
        </div>
        <div
          id="home-content-col-2"
          className="
            flex 
            flex-col
            w-full 
            lg:w-1/3 
            gap-4
          "
        >
          <QuickLearn />
          <Suspense fallback={<PlaceholderCard card="weekly-trends" />}>
            <WeeklyTrends />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
