import React from "react";
// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SteamWidget() {
  return (
    <Card className="w-full">
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
        <CardTitle className="text-lg">Steam Workshop</CardTitle>
        <CardDescription>
          Subscribe to the Nexus TCG Tabletop Simulator mod on Steam Workshop to
          play.
        </CardDescription>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          overflow-hidden
          px-4
          rounded-b-md
        "
      >
        <iframe
          src="https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </CardContent>
    </Card>
  );
}
