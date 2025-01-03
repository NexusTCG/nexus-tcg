import React from "react";
// Custom components
import CardsGallery from "@/components/cards-gallery/cards-gallery";

export default async function Cards({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Destructure search parameters
  let search = (await searchParams).search;
  let sort = (await searchParams).sort;
  let order = (await searchParams).order;
  let type = (await searchParams).type;
  let energy = (await searchParams).energy;
  let grade = (await searchParams).grade;
  let approvedOnly = (await searchParams).approvedOnly;
  let from = (await searchParams).from;

  // Convert search parameters to strings
  search = search?.toString() ?? "";
  sort = sort?.toString() ?? "id";
  order = order?.toString() ?? "asc";
  type = type?.toString() ?? "all";
  energy = energy?.toString() ?? "all";
  grade = grade?.toString() ?? "all";
  approvedOnly = approvedOnly?.toString() ?? "false";
  from = from?.toString() ?? "all";

  return (
    <div
      id="cards-page-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        px-0
        sm:px-4
        md:px-8
        py-4
        gap-8
      "
    >
      <CardsGallery
        key={`${sort}-${order}-${type}-${energy}-${grade}-${approvedOnly}-${from}`}
        search={search}
        sort={sort}
        order={order as "asc" | "desc"}
        type={type}
        energy={energy}
        grade={grade}
        approvedOnly={approvedOnly}
        from={from}
      />
    </div>
  );
}
