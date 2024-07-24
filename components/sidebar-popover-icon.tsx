"use client"

import React, { 
  useState, 
  useRef 
} from "react"
// Utils
import Image from 'next/image';
// Data
import { socialChannels } from "@/app/lib/data/data";
// Components
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"
// Custom components
import SocialLink from "@/components/social-link";
// Icons
import NexusIconWhite from "@/public/nexus-icon-white.svg"

export default function SidebarIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={NexusIconWhite}
            alt="Nexus TCG icon"
            width={32}
            height={32}
            className="
              hover:opacity-80 
              transition-transform duration-300 ease-in-out 
              hover:rotate-45
              hover:cursor-pointer
            "
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        side="right"
        align="start"
        className="w-48 -mt-2 ml-2 shadow-lg p-2"
      >
        <div className="grid">
          {(Object
            .keys(socialChannels) as Array<keyof typeof socialChannels>)
            .map((channel) => (
            <SocialLink key={channel} channel={channel} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}