import React, { Suspense } from "react";
// Utils
import dynamic from "next/dynamic";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// import ReadyToPlay from "@/components/home/ready-to-play";
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Dynamic custom components
const LatestCards = dynamic(() => import("@/components/home/latest-cards"));
const LatestNotifications = dynamic(
  () => import("@/components/home/latest-notifications")
);
const TopCards = dynamic(() => import("@/components/home/top-cards"));
const QuickLearn = dynamic(() => import("@/components/home/quick-learn"));
// const WeeklyTrends = dynamic(() => import("@/components/home/weekly-trends"));
const PlaceholderCard = dynamic(
  () => import("@/components/home/placeholder-card")
);

export default async function Home() {
  // const currentWeekCards = await getCardsDTO({
  //   order: { column: "created_at", direction: "desc" },
  //   currentWeekOnly: true,
  // });

  // Count the number of cards for each type
  // const cardTypeCounts =
  //   currentWeekCards?.reduce((acc, card: CardDTO) => {
  //     const type = card.initialMode.type;
  //     acc[type] = (acc[type] || 0) + 1;
  //     return acc;
  //   }, {} as Record<string, number>) || {};

  // Filter out types with no cards
  // const cardTypes = Object.entries(cardTypeCounts)
  //   .filter(([_, count]) => count > 0)
  //   .map(([type]) => type);

  // Filter out the top 10 cards by votes
  // const topCards =
  //   currentWeekCards
  //     ?.sort((a, b) => (b.votes || 0) - (a.votes || 0))
  //     .slice(0, 10) || [];

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
          {/* <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            {topCards.length > 0 ? (
              <TopCards topCards={topCards} />
            ) : (
              <PlaceholderCard card="top-cards" />
            )}
          </Suspense> */}
          <LatestNotifications />
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
          {/* TODO: Implement matchmaking system with Cal.com */}
          {/* <ReadyToPlay /> */}
          <QuickLearn />
          {/* <Suspense fallback={<PlaceholderCard card="weekly-trends" />}>
            <WeeklyTrends />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}
