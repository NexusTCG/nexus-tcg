"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// Utils
import Image from "next/image";
import Link from "next/link";
// Data
import { socialChannels } from "@/app/lib/data/data";
// Components
import NexusLogoWhite from "@/public/brand-assets/nexus-logo-white.svg";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import { FaSteam, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

export default function NavBar() {
  const [route, setRoute] = useState("/");
  const params = useParams();

  useEffect(() => {
    if (typeof params.route === "string") {
      setRoute(params.route);
    }
  }, [params]);

  return (
    <div
      id="nav-bar-container"
      className="
        absolute
        top-0
        left-0
        right-0
        z-50
        flex
        flex-row
        justify-between
        items-center
        md:max-w-4xl
        mt-4
        w-full
        mx-auto
        lg:px-0
        md:px-8
        px-4
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
          rounded-xl
          bg-zinc-900
          border
          border-zinc-700
          
        "
      >
        <div>
          <Link href="/cards">
            <Button variant="ghost" size="sm" className="font-medium">
              Cards
            </Button>
          </Link>
        </div>
        <div>
          <a
            href="https://nexusgamesinc.mintlify.app/quick-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="font-medium">
              Learn
            </Button>
          </a>
        </div>
        <div>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium">
              Login
            </Button>
          </Link>
        </div>
      </div>
      <div
        id="nav-social-container"
        className="
          hidden
          md:flex
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
  );
}
