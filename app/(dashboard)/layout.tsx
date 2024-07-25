import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Sidebar from "@/components/sidebar/sidebar"
import { Button } from "@/components/ui/button";
import { FaSteam } from "react-icons/fa";

const steamUrl = "https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215";

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
      "
    >
      <Sidebar />
      <div
        id="protected-routes-layout-content"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          py-4
          px-8
          gap-4
        "
      >
        <div
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
                <a href={steamUrl} target="_blank" rel="noopener noreferrer">
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
        </div>
        {children}
      </div>
    </div>
  )
}