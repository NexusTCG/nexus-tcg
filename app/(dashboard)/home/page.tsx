import React from "react";
// Utils
import dynamic from "next/dynamic";
// Data
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// import ReadyToPlay from "@/components/home/ready-to-play";
// Dynamic custom components
const LatestCards = dynamic(() => import("@/components/home/latest-cards"));
const LatestNotifications = dynamic(
  () => import("@/components/home/latest-notifications")
);
const TopCards = dynamic(() => import("@/components/home/top-cards"));
const QuickLearn = dynamic(() => import("@/components/home/quick-learn"));
const WeeklyTrends = dynamic(() => import("@/components/home/weekly-trends"));

export default async function Home() {
  const currentWeekCards = await getCardsDTO({
    order: { column: "created_at", direction: "desc" },
    currentWeekOnly: true,
  });

  // Count the number of cards for each type
  const cardTypeCounts =
    currentWeekCards?.reduce((acc, card: CardDTO) => {
      const type = card.initialMode.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  // Filter out types with no cards
  const cardTypes = Object.entries(cardTypeCounts)
    .filter(([_, count]) => count > 0)
    .map(([type]) => type);

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
          <LatestCards />
          <TopCards />
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
          {cardTypes.length > 0 && (
            <WeeklyTrends
              cardTypes={cardTypes}
              cardTypeCounts={cardTypeCounts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
