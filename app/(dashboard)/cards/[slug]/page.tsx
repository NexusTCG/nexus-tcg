import React from "react";
import { CardDTO } from "@/app/lib/types/dto";
import CardContent from "@/components/card-render/card-render-content";

async function fetchCard(slug: string): Promise<CardDTO | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/data/fetch-cards?id=${slug}`, { 
    cache: 'no-store' 
  });
  if (!res.ok) {
    throw new Error('Failed to fetch card');
  }
  const data = await res.json();
  return data[0] || null;
}

export default async function CardSlug({ 
  params 
}: { 
  params: { 
    slug: string 
  } 
}) {
  const card = await fetchCard(params.slug);

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div
      id={`${card.id}-container`}
      className="
        flex
        flex-col
        md:flex-row
        justify-start
        items-start
        w-full
      "
    >
      <div
        id={`${card.id}-content-container`}
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          px-4
          md:px-8
          py-4
          gap-4
        "
      >
        <div 
          id="card-creator-container" 
          className="
            flex 
            flex-col 
            justify-start 
            items-center 
            w-full 
            h-full
            min-h-[calc(100vh-10rem)]
            border 
            border-zinc-700 
            rounded-sm 
            overflow-hidden
          "
        >
          <CardContent card={card} />
        </div>
      </div>
    </div>
  );
}