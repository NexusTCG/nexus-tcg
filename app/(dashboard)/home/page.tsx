import React from "react";
// Utils
import dynamic from "next/dynamic";
// Dynamic custom components
const SteamWidget = dynamic(() => import("@/components/home/steam-widget"));
const LatestCards = dynamic(() => import("@/components/home/latest-cards"));
const QuickLearn = dynamic(() => import("@/components/home/quick-learn"));
const WeeklyTrends = dynamic(() => import("@/components/home/weekly-trends"));

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
          <LatestCards />
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
          <WeeklyTrends />
          {/* Discord Widget */}
          <iframe
            src="https://discord.com/widget?id=1136652718929362985&theme=dark"
            width="100%"
            height="480"
            allowTransparency={true}
            frameBorder={0}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style={{ borderRadius: "6px" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
