"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

type CardsGallerySearchbarProps = {
  initialSearch: string;
};

export default function CardsGallerySearchbar({
  initialSearch,
}: CardsGallerySearchbarProps) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (search) {
      current.set("search", search);
    } else {
      current.delete("search");
    }
    router.push(`/cards?${current.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full sm:w-auto">
      <Input
        type="search"
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:max-w-[300px]"
      />
    </form>
  );
}
