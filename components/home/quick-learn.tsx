import React from "react";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
// Custom components
import LearnKeyword from "@/components/home/learn-keyword";
import LearnTerm from "@/components/home/learn-term";
// Icons
import { MdOpenInNew } from "react-icons/md";

export default async function QuickLearn() {
  return (
    <Card
      className="
        w-full
        border
        border-zinc-700
        overflow-hidden
      "
    >
      <CardHeader
        id="quick-learn-header"
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
        <CardTitle className="text-lg">Quick learn</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="
                flex
                flex-row
                justify-center
                items-center
                gap-1
                text-muted-foreground
                hover:text-foreground
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              <a
                href="https://nexusgamesinc.mintlify.app/"
                rel="noreferrer"
                target="_blank"
                className="
                  text-sm
                  text-muted-foreground
                  hover:text-foreground
                  transition-colors
                  duration-300
                "
              >
                Learn more
              </a>
              <MdOpenInNew className="w-[1rem] h-[1rem]" />
            </TooltipTrigger>
            <TooltipContent side="left">Go to documentation</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent
        id="quick-learn-content-container"
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
          id="quick-learn-keyword-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-4
          "
        >
          <LearnKeyword />
        </div>
        <Separator />
        <div
          id="quick-learn-term-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            p-4
          "
        >
          {/* TODO: Replace dummy data with fetched data */}
          <LearnTerm
            name="Draw"
            type="action"
            description="Place the top card of your deck in your hand."
          />
        </div>
      </CardContent>
    </Card>
  );
}
