import React from "react";
// Utils
import clsx from "clsx";
// Validation
import { KeywordsType } from "@/app/lib/types/database";
// Icons
import { MdOpenInNew } from "react-icons/md";

type LearnKeywordProps = Omit<KeywordsType, 'id' | 'created_at' | 'tip'>;

export default function LearnKeyword({ 
  name,
  reminder,
  type 
}: LearnKeywordProps) {
  // Get dynamic Keyword data from supabase as props
  // Wrap this in suspense

  return (
    <div className={clsx("flex flex-col justify-start items-start w-full gap-2 border p-4 rounded-md", 
        {
          "bg-blue-500/20 border-blue-500/80": type === "persistent",
          "bg-orange-500/20 border-orange-500/80": type === "reactive",
          "bg-emerald-500/20 border-emerald-500/80": type === "active",
        }
      )}
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
          <small className="hidden md:lg">Keywords</small>
          <MdOpenInNew className="text-teal-500 w-[1rem] h-[1rem]"/>
        </div>
      </div>
      <p className="text-sm font-light opacity-60">{reminder}</p>
    </div>
  );
}