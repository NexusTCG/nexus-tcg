"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
import { useParams } from 'next/navigation'
// Utils
import Image from "next/image";
import Link from "next/link";
// Data
import { socialChannels } from "@/app/lib/data/data";
// Components
import NexusLogoWhite from "@/public/nexus-logo-white.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Icons
import { 
  FaSteam, 
  FaTwitter,
  FaDiscord, 
  FaGithub 
} from "react-icons/fa";

export default function NavBar() {
  const [route, setRoute] = useState("/")
  const params = useParams()
  
  useEffect(() => {
    if (typeof params.route === "string") {
      setRoute(params.route)
    }
  }, [params])

  return (
    <div
      id="nav-bar-container"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
      "
    >
      <div
        id="nav-logo-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
        "
      >
        <Link href="/">
          <Image
            src={NexusLogoWhite}
            alt="Nexus Logo"
            width={100}
            height={24}
            className="hover:opacity-80"
          />
        </Link>
      </div>
      <div
        id="nav-buttons-container"
        className="
          flex
          items-center
          p-1
          rounded-lg
          bg-zinc-900
          border
          border-zinc-700
        "
      >
        <div>
        <Link href="/cards">
          <Button variant="ghost">Cards</Button>
        </Link>
        </div>
        <div>
        <Link href="/learn">
          <Button variant="ghost">Learn</Button>
        </Link>
        </div>
        {/* Separator is not showing */}
        <Separator orientation="vertical" />
        <div>
        <Link href="/login">
          <Button variant="ghost" size="sm">Login</Button>
        </Link>
        </div>
      </div>
      <div
        id="nav-social-container"
        className="
          flex
          flex-row
          justify-end
          items-center
          w-full
        "
      >
        {/* TODO: Map over the social icons instead */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={socialChannels.twitter.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <FaTwitter className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nexus on Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={socialChannels.discord.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <FaDiscord className="h-[1.2rem] w-[1.2rem] hover:opacity-80" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nexus on Discord</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={socialChannels.steam.href}
                target="_blank"
                rel="noopener noreferrer"
              >
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
      </div>
    </div>
  )
}