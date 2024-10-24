"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Utils
import { cn } from "@/lib/utils";
// Components
import { Input } from "@/components/ui/input";

type CardsGallerySearchbarProps = {
  initialSearch: string;
  totalResults: number;
};

export default function CardsGallerySearchbar({
  initialSearch,
  totalResults,
}: CardsGallerySearchbarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (search) {
      current.set("search", search);
    } else {
      current.delete("search");
    }
    router.push(`/cards?${current.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "flex flex-row justify-start items-center transition-all duration-500 ease-in-out",
        isFocused ? "w-full" : "w-1/2"
      )}
    >
      <Input
        type="search"
        placeholder={
          totalResults > 0
            ? `Search ${totalResults} cards...`
            : "Search cards..."
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="
          flex-grow
          w-full
          transition-all
          duration-500
          ease-in-out
        "
      />
    </form>
  );
}
