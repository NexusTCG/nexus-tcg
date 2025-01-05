"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Utils
import dynamic from "next/dynamic";
// Data
import {
  VALID_SORT_OPTIONS,
  VALID_ORDER_OPTIONS,
  VALID_FILTER_CARD_TYPE_OPTIONS,
  VALID_FILTER_ENERGY_OPTIONS,
  VALID_FILTER_GRADE_OPTIONS,
  VALID_FROM_OPTIONS,
} from "@/app/lib/data/components";
// Validation
import {
  ValidSortOption,
  ValidOrderOption,
  ValidFilterCardTypeOption,
  ValidFilterEnergyOption,
  ValidFilterGradeOption,
  ValidFromOption,
} from "@/app/lib/types/components";
// Custom components
const CardsGalleryApprovedCheckbox = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-approved-checkbox")
);
const CardsGallerySortOptions = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-sort-options")
);
const CardsGalleryFromOptions = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-from-options")
);
const CardsGalleryFilters = dynamic(
  () => import("@/components/cards-gallery/cards-gallery-filters")
);

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
    <>
      <CardsGalleryApprovedCheckbox
        approvedOnly={approvedOnly}
        updateSearchParams={updateSearchParams}
      />
      <CardsGallerySortOptions
        sort={sort}
        order={order}
        updateSearchParams={updateSearchParams}
      />
      <CardsGalleryFromOptions
        from={from}
        updateSearchParams={updateSearchParams}
      />
      <CardsGalleryFilters
        type={type}
        energy={energy}
        grade={grade}
        updateSearchParams={updateSearchParams}
      />
    </>
  );
}
