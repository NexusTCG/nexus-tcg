import React from "react";
// Utils
import Image from "next/image";
// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Data
import { energyIcons, gradeIcons } from "@/app/lib/data/icons";

type CardsGalleryFiltersProps = {
  type: string;
  energy: string;
  grade: string;
  updateSearchParams: (key: string, value: string) => void;
};

export default function CardsGalleryFilters({
  type,
  energy,
  grade,
  updateSearchParams,
}: CardsGalleryFiltersProps) {
  return (
    <>
      <small className="text-muted-foreground text-xs whitespace-nowrap -mr-2">
        Filter
      </small>
      {/* FILTER: CARD TYPE */}
      <Select
        value={type}
        onValueChange={(value: string) => updateSearchParams("type", value)}
      >
        <SelectTrigger className="w-full min-w-[120px] max-w-[180px] truncate -mr-2">
          <SelectValue placeholder="Card type" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px] max-w-[180px]">
          <SelectItem value="all">All card types</SelectItem>
          <SelectItem value="agent">Agent</SelectItem>
          <SelectItem value="event">Event</SelectItem>
          <SelectItem value="software">Software</SelectItem>
          <SelectItem value="software_agent">Software Agent</SelectItem>
          <SelectItem value="hardware">Hardware</SelectItem>
          <SelectItem value="hardware_agent">Hardware Agent</SelectItem>
        </SelectContent>
      </Select>

      {/* FILTER: ENERGY */}
      <Select
        value={energy}
        onValueChange={(value: string) => updateSearchParams("energy", value)}
      >
        <SelectTrigger className="w-full min-w-[120px] max-w-[180px] truncate -mr-2">
          <SelectValue placeholder="Energy type" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px] max-w-[180px]">
          <SelectItem value="all">All energy types</SelectItem>
          {Object.entries(energyIcons).map(([type, icon]) => {
            if (type !== "void") {
              return (
                <SelectItem key={type} value={type}>
                  <div className="flex flex-row items-center gap-2 w-full">
                    <Image src={icon} alt={type} width={16} height={16} />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </div>
                </SelectItem>
              );
            }
            // Handle void energy type
            return (
              <SelectItem key="void" value="void">
                <div className="flex flex-row items-center gap-2 w-full">
                  <Image
                    src={energyIcons.void[1]}
                    alt="Void"
                    width={16}
                    height={16}
                  />
                  <span>Void</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* FILTER: GRADE */}
      <Select
        value={grade}
        onValueChange={(value: string) => updateSearchParams("grade", value)}
      >
        <SelectTrigger className="w-full min-w-[120px] max-w-[180px] truncate">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent className="w-full min-w-[120px] max-w-[180px]">
          <SelectItem value="all">All grades</SelectItem>
          {gradeIcons.map(({ name, icon }) => (
            <SelectItem key={name} value={name}>
              <div className="flex flex-row items-center gap-2 w-full">
                <Image src={icon} alt={name} width={16} height={16} />
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
