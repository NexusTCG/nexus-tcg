import React, { Suspense } from "react";
// Utils
import dynamic from "next/dynamic";
// Custom Components
import CardSkeleton from "@/components/card-skeleton";
// import ReadyToPlay from "@/components/home/ready-to-play";
// Dynamic custom components
const LatestCards = dynamic(() => import("@/components/home/latest-cards"));
const LatestNotifications = dynamic(
  () => import("@/components/home/latest-notifications")
);
const TopCards = dynamic(() => import("@/components/home/top-cards"));
const QuickLearn = dynamic(() => import("@/components/home/quick-learn"));
const WeeklyTrends = dynamic(() => import("@/components/home/weekly-trends"));

export default function Home() {
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
          <Suspense fallback={<CardSkeleton height="half" />}>
            <QuickLearn />
          </Suspense>
          <WeeklyTrends />
        </div>
      </div>
    </div>
  );
}
