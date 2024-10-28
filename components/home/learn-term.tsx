import React from "react";
// Data
import { getTermsDTO } from "@/app/server/data/terms-dto";
// Icons
import { MdOpenInNew } from "react-icons/md";

export default async function LearnTerm() {
  const terms = await getTermsDTO();
  if (!terms || terms.length === 0) return null;

  const randomTerm = terms[Math.floor(Math.random() * terms.length)];
  if (!randomTerm) return null;

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
        p-4
        rounded-md
        bg-zinc-900
        border-zinc-500
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
          <h3 className="font-semibold">{randomTerm.name}</h3>
          {randomTerm.type && (
            <small className="text-xs font-medium opacity-80">
              {randomTerm.type.toUpperCase()}
            </small>
          )}
        </div>
        <div
          className="
            hidden
            md:flex
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
            href="https://nexusgamesinc.mintlify.app/documentation/glossary"
            rel="noreferrer"
            target="_blank"
            className="hidden md:inline-block"
          >
            Glossary
          </a>
          <MdOpenInNew className="w-[1rem] h-[1rem]" />
        </div>
      </div>
      <p className="text-sm font-light opacity-60">{randomTerm.description}</p>
    </div>
  );
}
