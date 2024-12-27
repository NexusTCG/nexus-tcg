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
import { Checkbox } from "@/components/ui/checkbox";
// Custom components
import CardsGalleryFilters from "@/components/cards-gallery/cards-gallery-filters";

const VALID_SORT_OPTIONS = ["id", "name", "type", "grade"] as const;
type ValidSortOption = (typeof VALID_SORT_OPTIONS)[number];

const VALID_ORDER_OPTIONS = ["asc", "desc"] as const;
type ValidOrderOption = (typeof VALID_ORDER_OPTIONS)[number];

const VALID_FILTER_CARD_TYPE_OPTIONS = [
  "all",
  "agent",
  "event",
  "software",
  "software_agent",
  "hardware",
  "hardware_agent",
] as const;
type ValidFilterCardTypeOption =
  (typeof VALID_FILTER_CARD_TYPE_OPTIONS)[number];

const VALID_FILTER_ENERGY_OPTIONS = [
  "all",
  "light",
  "storm",
  "dark",
  "chaos",
  "growth",
  "void",
] as const;
type ValidFilterEnergyOption = (typeof VALID_FILTER_ENERGY_OPTIONS)[number];

const VALID_FILTER_GRADE_OPTIONS = [
  "all",
  "core",
  "rare",
  "epic",
  "prime",
  "legendary",
] as const;
type ValidFilterGradeOption = (typeof VALID_FILTER_GRADE_OPTIONS)[number];

const VALID_FROM_OPTIONS = ["week", "month", "year", "all"] as const;
type ValidFromOption = (typeof VALID_FROM_OPTIONS)[number];

type CardsGallerySortFilterProps = {
  sort: string;
  order: string;
  from: string;
  // Filters
  type: string; // Card type
  energy: string; // Energy
  grade: string; // Grade
  approvedOnly: string; // Approved only
};

export default function CardsGallerySortFilter({
  sort,
  order,
  from,
  type,
  energy,
  grade,
  approvedOnly,
}: CardsGallerySortFilterProps) {
  // const router = useRouter();
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

    // Validate card type filter
    if (
      key === "type" &&
      !VALID_FILTER_CARD_TYPE_OPTIONS.includes(
        value as ValidFilterCardTypeOption
      )
    ) {
      value = "all";
    }

    // Validate card energy filter
    if (
      key === "energy" &&
      !VALID_FILTER_ENERGY_OPTIONS.includes(value as ValidFilterEnergyOption)
    ) {
      value = "all";
    }

    // Validate card grade filter
    if (
      key === "grade" &&
      !VALID_FILTER_GRADE_OPTIONS.includes(value as ValidFilterGradeOption)
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

    // Validate approved only
    if (key === "approvedOnly" && value !== "true" && value !== "false") {
      value = "false";
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
        <CardsGalleryFilters
          type={type}
          energy={energy}
          grade={grade}
          updateSearchParams={updateSearchParams}
        />
      </div>
      <div
        id="from-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
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
      <div
        id="approved-only-container"
        className="
          flex
          flex-row
          justify-start
          items-center
          gap-2
        "
      >
        <small className="text-muted-foreground text-xs whitespace-nowrap">
          Approved only
        </small>
        <Checkbox
          id="approved"
          checked={approvedOnly === "true"}
          onCheckedChange={(checked) => {
            updateSearchParams("approvedOnly", checked ? "true" : "false");
          }}
        />
      </div>
    </div>
  );
}
