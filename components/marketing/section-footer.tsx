import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Data
import { socialChannels, policyLinks } from "@/app/lib/data/data"
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Custom components
import SocialLink from "@/components/social-link";
import NexusLogoWhite from "@/public/brand-assets/nexus-logo-white.svg";

export default function SectionFooter() {
  return (
    <footer
      className="
        flex
        justify-start
        w-full 
        max-w-4xl
        text-white
        pt-8
        pb-16
      "
    >
      <div
        id="footer-content-container"
        className="
          flex
          flex-row
          justify-between
          items-start
          w-full
          px-4
          sm:px-0
        "
      >
        <div
          id="footer-policies"
          className="
            flex
            flex-col
            justify-start
            items-start
            md:w-1/5
            sm:w-1/4
            1/2
            gap-4
          "
        >
          <small className="text-teal-500">Policies</small>
          <ul className="text-xs text-neutral-600 ">
            {Object.entries(policyLinks).map(([key, policy]) => {
              return (
                <li
                  key={key}
                  className="
                    hover:text-neutral-400
                    hover:underline
                  "
                >
                  <a href={policy.href} target="_blank" rel="noopener noreferrer">
                    {policy.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          id="footer-links"
          className="
            hidden
            sm:flex
            flex-col
            justify-start
            items-start
            md:w-1/5
            sm:w-1/4
            gap-4
          "
        >
          <small className="text-teal-500">Pages</small>
          <ul className="text-xs text-neutral-600 ">
            <li className="hover:text-neutral-400 hover:underline">
              <Link href="/learn">Cards</Link>
            </li>
            <li className="hover:text-neutral-400 hover:underline">
              <Link href="/learn">Learn</Link>
            </li>
          </ul>
        </div>
        <div
          id="footer-channels"
          className="
            hidden
            sm:flex
            flex-col
            justify-start
            items-start
            md:w-1/5
            sm:w-1/4
            gap-4
          "
        >
          <small className="text-teal-500">Channels</small>
          <div
            id="channel-icons-container"
            className="
              flex
              flex-row
              flex-wrap
              justify-start
              items-start
              gap-2
              w-full
              max-w-[150px]
            "
          >
            {Object.entries(socialChannels).map(([key, channel]) => {
              return (
                <TooltipProvider key={key}>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={channel.label}
                        className="
                          text-neutral-600
                          hover:text-neutral-400
                        "
                      >
                        <channel.icon size={16} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{`Follow Nexus on ${channel.label}`}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        <div className="hidden md:block w-1/4 md:w-1/5"></div>
        <div
          id="footer-logo"
          className="
            flex
            flex-col
            justify-start
            items-start
            gap-4
            md:w-1/5
            sm:w-1/4
            w-1/2
          "
        >
          <small className="text-teal-500">
            &copy; Nexus Games Inc. {new Date().getFullYear()}
          </small>
          <Image
            src={NexusLogoWhite}
            alt="Nexus Logo"
            width={100}
            height={24}
            className="opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}