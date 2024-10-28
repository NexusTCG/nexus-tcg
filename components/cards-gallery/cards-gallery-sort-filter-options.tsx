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
        justify-between
        items-center
        w-full
        gap-4
      "
    >
      <div
        id="sort-direction-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
          w-full
        "
      >
        <small className="text-muted-foreground text-xs whitespace-nowrap">
          Sort
        </small>
        <Select
          value={sort}
          onValueChange={(value: string) => updateSearchParams("sort", value)}
        >
          <SelectTrigger
            className="
              w-full
              truncate
            "
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="grade">Grade</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={order}
          onValueChange={(value: string) => updateSearchParams("order", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        id="filter-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
          w-full
        "
      >
        <small className="text-muted-foreground text-xs whitespace-nowrap">
          Filter
        </small>
        <Select
          value={filter}
          onValueChange={(value: string) => updateSearchParams("filter", value)}
        >
          <SelectTrigger
            className="
              w-full
              truncate
            "
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="software">Software</SelectItem>
            <SelectItem value="software_agent">Software Agent</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="hardware_agent">Hardware Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        id="from-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
          w-full
        "
      >
        <small className="text-muted-foreground text-xs whitespace-nowrap">
          From
        </small>
        <Select>
          <SelectTrigger
            className="
              w-full
              truncate
            "
          >
            <SelectValue placeholder="This week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">This week</SelectItem>
            <SelectItem value="90">This month</SelectItem>
            <SelectItem value="365">This year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
