import React, { Suspense } from "react";
// Custom Components
import LatestCards from "@/components/home/latest-cards";
import LatestNotifications from "@/components/home/latest-notifications";
import TopCards from "@/components/home/top-cards";
import ReadyToPlay from "@/components/home/ready-to-play";
import QuickLearn from "@/components/home/quick-learn";
import WeeklyTrends from "@/components/home/weekly-trends";
import CardSkeleton from "@/components/card-skeleton";

export default function Home() {
  return (
    <div id="home-page-container" className="w-full px-4 sm:px-6 md:px-8 py-4">
      <div
        id="home-content-container"
        className="flex flex-col lg:flex-row gap-4"
      >
        <div id="col-1" className="w-full lg:w-2/3 flex flex-col gap-4">
          <LatestCards />
          <TopCards />
          <LatestNotifications />
        </div>
        <div id="col-2" className="w-full lg:w-1/3 flex flex-col gap-4">
          <ReadyToPlay />
          <Suspense fallback={<CardSkeleton height="half" />}>
            <QuickLearn />
          </Suspense>
          <WeeklyTrends />
        </div>
      </div>
    </div>
  );
}
