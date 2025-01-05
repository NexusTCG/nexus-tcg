import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Data
import { VALID_FROM_OPTIONS } from "@/app/lib/data/components";
// Types
import { ValidFromOption } from "@/app/lib/types/components";

type CardsGalleryFromOptionsProps = {
  from: string;
  updateSearchParams: (key: string, value: string) => void;
};

export default function CardsGalleryFromOptions({
  from,
  updateSearchParams,
}: CardsGalleryFromOptionsProps) {
  return (
    <div
      id="from-container"
      className="
        flex items-center gap-2
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
        <SelectTrigger className="w-full min-w-[120px] truncate">
          <SelectValue placeholder="All time" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px]">
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="year">This year</SelectItem>
          <SelectItem value="month">This month</SelectItem>
          <SelectItem value="week">This week</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
