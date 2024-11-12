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
        layout: "month_view",
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
      "
    >
      <Cal
        namespace="playtest-90"
        calLink="nexus-tcg/playtest-90"
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
