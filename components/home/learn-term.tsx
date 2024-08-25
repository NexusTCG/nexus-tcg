import React from "react";
// Validation
import { GlossaryTermType } from "@/app/lib/types/database";
// Icons
import { MdOpenInNew } from "react-icons/md";

type LearnTermProps = Omit<GlossaryTermType, 'id' | 'created_at' | 'tip'>;

export default function LearnTerm({ 
  name,
  description,
  type 
}: LearnTermProps) {
  // Get dynamic Keyword data from supabase as props
  // Wrap this in suspense

  return (
    <div 
      className="
        flex 
        flex-col 
        justify-start 
        items-start 
        w-full 
        gap-2
        border
        border-zinc-500 
        p-4 
        rounded-md
        bg-zinc-900
      "
    >
      <div
        id="keyword-header"
        className="
          flex
          flex-row
          justify-between
          items-start
          w-full
        "
      >
        <div
          className="
            flex
            flex-row
            justify-start
            items-baseline
            gap-2
          "
        >
          <h3 className="font-semibold">{name}</h3>
          <small className="text-xs font-medium opacity-80">{type.toUpperCase()}</small>
        </div>
        <div
          className="
            flex
            flex-row
            justify-end
            items-center
            gap-1
            hover:cursor-pointer
            hover:opacity-80
          "
        >
          <small className="hidden md:inline-block">Glossary</small>
          <MdOpenInNew className="text-teal-500 w-[1rem] h-[1rem]"/>
        </div>
      </div>
      <p className="text-sm font-light opacity-60">{description}</p>
    </div>
  );
}