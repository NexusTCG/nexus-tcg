import React from "react";
// Utils
import Link from "next/link";
// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
// Custom components
import ReadyPlayerRow from "@/components/home/ready-player-row"

export default function ReadyToPlay() {
  return (
    <Card className="w-full border border-zinc-700 overflow-hidden">
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
        <CardTitle className="text-lg">
          Ready to play
        </CardTitle>
        <Link
          href="/matchmaking"
          className="text-sm opacity-50 hover:opacity-80"
        >
          More players
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          overflow-hidden
          px-0
          pb-0
          rounded-b-md
        "
      >
        {/* TODO: Fetch and render players dynamically */}
        <ReadyPlayerRow
          username="NilsW with a very long name"
          avatarUrl=""
          nextAvailability="Today"
        />
        <Separator />
        <ReadyPlayerRow
          username="NilsW"
          avatarUrl=""
          nextAvailability="Tomorrow"
        />
        <Separator />
        <ReadyPlayerRow
          username="NilsW"
          avatarUrl=""
          nextAvailability="Next week"
        />
      </CardContent>
    </Card>
  )
}