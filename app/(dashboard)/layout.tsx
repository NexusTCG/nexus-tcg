import React from "react";
// Utils
import { socialChannels } from "@/app/lib/data/data";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle"
// Custom components
import Sidebar from "@/components/sidebar/sidebar"
// Icons
import { FaSteam } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div
      id="protected-routes-layout"
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        h-min-screen
        overflow-y-auto
      "
    >
      <Sidebar />
      <div
        id="protected-routes-layout-content"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          h-screen
        "
      >
        {/* TODO: Move darkmode toggle */}
        {/* <div
          id="content-header"
          className="
            flex
            flex-row
            justify-end
            items-center
            w-full
          "
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={socialChannels.steam.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <FaSteam className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nexus on Steam</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </div> */}
        {children}
      </div>
    </div>
  )
}