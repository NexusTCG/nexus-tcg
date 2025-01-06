import React from "react";
// Data
import {
  VALID_SORT_OPTIONS,
  VALID_ORDER_OPTIONS,
} from "@/app/lib/data/components";
// Validation
import { ValidSortOption, ValidOrderOption } from "@/app/lib/types/components";
// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CardsGallerySortOptionsProps = {
  sort: string;
  order: string;
  updateSearchParams: (key: string, value: string) => void;
};

export default function CardsGallerySortOptions({
  sort,
  order,
  updateSearchParams,
}: CardsGallerySortOptionsProps) {
  return (
    <div
      id="sort-direction-container"
      className="
        flex
        items-center
        gap-2
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
        <SelectTrigger className="w-full min-w-[120px] truncate">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px]">
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
        <SelectTrigger className="w-full min-w-[120px] truncate">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px]">
          <SelectItem value="desc">Desc</SelectItem>
          <SelectItem value="asc">Asc</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
