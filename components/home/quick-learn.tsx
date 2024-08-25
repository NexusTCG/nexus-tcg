import React from "react";
// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
// Custom components
import LearnKeyword from "@/components/home/learn-keyword"
import LearnTerm from "@/components/home/learn-term"

export default async function QuickLearn() {

  // const keyword = await getKeyword();

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
          Quick learn
        </CardTitle>
        <a
          href="https://www.play.nexus/" // Link to game docs on Mintlify
          rel="noreferrer"
          target="_blank"
          className="text-sm opacity-50 hover:opacity-80"
        >
          Learn more
        </a>
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
        <div
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-4
          "
        >
          <LearnKeyword
            name="Evasion"
            type="persistent"
            reminder="Can only be defended by agents with evasion or intercept."
          />
        </div>
        <Separator />
        <div
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-4
          "
        >
          <LearnTerm
            name="Draw"
            type="action"
            description="Place the top card of your deck in your hand."
          />
        </div>
      </CardContent>
    </Card>
  )
}