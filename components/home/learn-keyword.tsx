import React from "react";
// Utils
import clsx from "clsx";
// Validation
import { KeywordsType } from "@/app/lib/types/database";
import { getKeywordsDTO } from "@/app/server/data/keywords-dto";
// Icons
import { MdOpenInNew } from "react-icons/md";

export default async function LearnKeyword() {
  const keywords = await getKeywordsDTO();
  if (!keywords) return null;

  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  if (!randomKeyword) return null;

  return (
    <div
      className={clsx(
        "flex flex-col justify-start items-start w-full gap-2 border p-4 rounded-md",
        {
          "bg-blue-500/20 border-blue-500/80":
            randomKeyword.type === "persistent",
          "bg-orange-500/20 border-orange-500/80":
            randomKeyword.type === "reactive",
          "bg-emerald-500/20 border-emerald-500/80":
            randomKeyword.type === "active",
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
          <h3 className="font-semibold">{randomKeyword.name}</h3>
          <small className="text-xs font-medium opacity-80">
            {randomKeyword?.type?.toUpperCase()}
          </small>
        </div>
        <div
          className="
            flex
            flex-row
            justify-center
            items-center
            gap-1
            text-muted-foreground
            hover:text-foreground
            transition-colors
            duration-300
            cursor-pointer
            text-sm
          "
        >
          <a
            href="https://nexusgamesinc.mintlify.app/documentation/keywords"
            rel="noreferrer"
            target="_blank"
            className="hidden md:inline-block"
          >
            Keywords
          </a>
          <MdOpenInNew className="w-[1rem] h-[1rem]" />
        </div>
      </div>
      <p className="text-sm font-light opacity-60">{randomKeyword.reminder}</p>
    </div>
  );
}
