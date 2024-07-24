import React from "react";
import { socialChannels } from "@/app/lib/data/data";
import { MdOpenInNew } from "react-icons/md";

type SocialLinkProps = {
  channel: keyof typeof socialChannels;
};

export default function SocialLink({ 
  channel 
}: SocialLinkProps) {
  const { 
    icon: Icon, 
    href, 
    label, 
    linkColor 
  } = socialChannels[channel];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex justify-between items-center w-full group hover:bg-zinc-900 p-2 rounded-sm opacity-60 hover:opacity-100 hover:${linkColor}`}
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          gap-1
          group
        "
      >
        <Icon className="mr-2 h-[1.2rem] w-[1.2rem]" />
        <small>{label}</small>
      </div>
      <MdOpenInNew className="text-zinc-500 h-[1rem] w-[1rem]" />
    </a>
  );
}