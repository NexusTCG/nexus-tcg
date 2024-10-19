"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CardsGallerySortFilterProps = {
  sort: string;
  order: string;
  filter: string;
};

export default function CardsGallerySortFilter({
  sort,
  order,
  filter,
}: CardsGallerySortFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    router.push(`/cards?${current.toString()}`);
  };

  return (
    <div
      id="cards-gallery-sort-filter-options"
      className="
        flex
        flex-row
        justify-start
        items-center
        gap-4
      "
    >
      <Select
        value={sort}
        onValueChange={(value) => updateSearchParams("sort", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="created_at">Created</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="type">Type</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={order}
        onValueChange={(value) => updateSearchParams("order", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filter}
        onValueChange={(value) => updateSearchParams("filter", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="agent">Agent</SelectItem>
          <SelectItem value="event">Event</SelectItem>
          <SelectItem value="anomaly">Anomaly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
