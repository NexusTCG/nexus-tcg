"use client";

import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Utils
import { cn } from "@/lib/utils";
// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CardsGallerySearchbarProps = {
  initialSearch: string;
  totalResults: number;
};

export default function CardsGallerySearchbar({
  initialSearch,
  totalResults,
}: CardsGallerySearchbarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSearching) return;
    setIsSearching(true);

    try {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Update search param
      if (search.trim()) {
        current.set("search", search.trim());
      } else {
        current.delete("search");
      }

      router.replace(`/cards?${current.toString()}`);
    } catch (error) {
      console.error("Error searching cards:", error);
    } finally {
      setIsSearching(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-row justify-start items-center transition-all duration-500 ease-in-out gap-2",
        isFocused || isSearching
          ? "w-full lg:w-1/2"
          : "w-full sm:w-1/2 lg:w-1/3"
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
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isSearching ?? true} // Temporarily disabled
        className="
          flex-grow
          w-full
          transition-all
          duration-500
          ease-in-out
        "
      />
      {/* Temporarily disabled */}
      <Button type="submit" disabled={isSearching ?? true}>
        {isSearching ? "Searching..." : "Search"}
      </Button>
      {/* TODO: Add select search type */}
    </form>
  );
}
