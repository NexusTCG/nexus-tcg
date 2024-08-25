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
import NotificationRow from "@/components/home/notification-row"

export default function LatestNotifications() {
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
        <CardTitle className="text-lg">
          Latest notifications
        </CardTitle>
        <Link
          href="/notifications"
          className="text-sm opacity-50 hover:opacity-80"
        >
          More notifications
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
        {/* TODO: Fetch and render dynamic data */}
        <NotificationRow
          username="NilsW"
          action="share"
          cardName="Blacker Lotus"
          actionAt="99 days ago"
        />
        <Separator />
        <NotificationRow
          username="NilsW"
          action="comment"
          cardName="Time Moonwalk"
          actionAt="99 days ago"
        />
        <Separator />
        <NotificationRow
          username="NilsW"
          action="vote"
          cardName="Spacetime Twister"
          actionAt="99 days ago"
        />
      </CardContent>
    </Card>
  )
}