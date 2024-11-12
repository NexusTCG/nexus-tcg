"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function Play() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "playtest-90" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "week_view",
      });
    })();
  }, []);

  return (
    <div
      id="play-page-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        h-[calc(100vh-60px)]
        px-4
        md:px-8
        py-4
        gap-8
      "
    >
      <div
        id="play-page-content-container"
        className="
          flex 
          flex-col 
          justify-start 
          items-center 
          w-full 
          border 
          border-zinc-700 
          rounded-sm 
          overflow-hidden
        "
      >
        <div
          id="play-page-content-header"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            p-4
            border-b
            border-zinc-700
          "
        >
          <h1>Playtest Nexus TCG</h1>
          <p className="text-sm text-muted-foreground">
            Book a playtest session with the Nexus TCG's creator.
          </p>
        </div>
        <Cal
          namespace="playtest-90"
          calLink="nexus-tcg/playtest-90"
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}
          config={{ layout: "week_view" }}
        />
      </div>
    </div>
  );
}
