import React from "react";
import { socialChannels } from "@/app/lib/data/data";
import { MdOpenInNew } from "react-icons/md";
import clsx from "clsx";

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
      className={clsx("flex justify-between items-center w-full group hover:bg-zinc-900 p-2 rounded-sm opacity-60 hover:opacity-100",
        {
          "hover:text-indigo-400": linkColor === "indigo",
          "hover:text-slate-400": linkColor === "slate",
          "hover:text-blue-400": linkColor === "blue",
          "hover:text-orange-400": linkColor === "orange",
          "hover:text-stone-400": linkColor === "stone",
          "hover:text-purple-400": linkColor === "purple",
          "hover:text-red-400": linkColor === "red",
          "hover:text-sky-400": linkColor === "sky",
        }
      )}
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