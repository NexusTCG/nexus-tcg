import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      {/* FILTER: CARD TYPE */}
      <Select
        value={type}
        onValueChange={(value: string) => updateSearchParams("type", value)}
      >
        <SelectTrigger className="w-full truncate">
          <SelectValue placeholder="Card type" />
        </SelectTrigger>
        <SelectContent>
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
        <SelectTrigger className="w-full truncate">
          <SelectValue placeholder="Energy type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All energy types</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="storm">Storm</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="chaos">Chaos</SelectItem>
          <SelectItem value="growth">Growth</SelectItem>
          <SelectItem value="void">Void</SelectItem>
        </SelectContent>
      </Select>

      {/* FILTER: GRADE */}
      <Select
        value={grade}
        onValueChange={(value: string) => updateSearchParams("grade", value)}
      >
        <SelectTrigger className="w-full truncate">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All grades</SelectItem>
          <SelectItem value="core">Core</SelectItem>
          <SelectItem value="rare">Rare</SelectItem>
          <SelectItem value="epic">Epic</SelectItem>
          <SelectItem value="prime">Prime</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
