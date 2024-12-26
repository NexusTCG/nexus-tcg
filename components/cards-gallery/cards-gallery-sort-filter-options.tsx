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

const VALID_SORT_OPTIONS = ["id", "name", "type", "grade"] as const;
type ValidSortOption = (typeof VALID_SORT_OPTIONS)[number];

const VALID_ORDER_OPTIONS = ["asc", "desc"] as const;
type ValidOrderOption = (typeof VALID_ORDER_OPTIONS)[number];

const VALID_FILTER_OPTIONS = [
  "all",
  "agent",
  "event",
  "software",
  "software_agent",
  "hardware",
  "hardware_agent",
] as const;
type ValidFilterOption = (typeof VALID_FILTER_OPTIONS)[number];

const VALID_FROM_OPTIONS = ["week", "month", "year", "all"] as const;
type ValidFromOption = (typeof VALID_FROM_OPTIONS)[number];

type CardsGallerySortFilterProps = {
  sort: string;
  order: string;
  filter: string;
  from: string;
};

export default function CardsGallerySortFilter({
  sort,
  order,
  filter,
  from,
}: CardsGallerySortFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function createQueryString(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    // Validate sort
    if (
      key === "sort" &&
      !VALID_SORT_OPTIONS.includes(value as ValidSortOption)
    ) {
      value = "id";
    }

    // Validate order
    if (
      key === "order" &&
      !VALID_ORDER_OPTIONS.includes(value as ValidOrderOption)
    ) {
      value = "desc";
    }

    // Validate filter
    if (
      key === "filter" &&
      !VALID_FILTER_OPTIONS.includes(value as ValidFilterOption)
    ) {
      value = "all";
    }

    // Validate from
    if (
      key === "from" &&
      !VALID_FROM_OPTIONS.includes(value as ValidFromOption)
    ) {
      value = "week";
    }

    if (value) {
      params.set(key, value);
      // Ensure order is set if sort is set
      if (key === "sort" && !params.has("order")) {
        params.set("order", "desc");
      }
    } else {
      params.delete(key);
    }

    return params.toString();
  }

  function updateSearchParams(key: string, value: string) {
    // Temporary solution to update search params with a hard page reload
    const queryString = createQueryString(key, value);
    window.location.href = `/cards?${queryString}`;

    // router.replace(`/cards?${createQueryString(key, value)}`, {
    //   scroll: false,
    // });
  }

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
          value={
            VALID_SORT_OPTIONS.includes(sort as ValidSortOption) ? sort : "id"
          }
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
            <SelectItem value="id">Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="grade">Grade</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={
            VALID_ORDER_OPTIONS.includes(order as ValidOrderOption)
              ? order
              : "desc"
          }
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
          value={
            VALID_FILTER_OPTIONS.includes(filter as ValidFilterOption)
              ? filter
              : "all"
          }
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
        <Select
          value={
            VALID_FROM_OPTIONS.includes(from as ValidFromOption) ? from : "all"
          }
          onValueChange={(value: string) => updateSearchParams("from", value)}
        >
          <SelectTrigger
            className="
              w-full
              truncate
            "
          >
            <SelectValue placeholder="All time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
