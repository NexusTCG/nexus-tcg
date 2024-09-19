import React from "react";

// DTO
import { CardDTO } from "@/app/lib/types/dto";
// Custom components
import CardRender from "@/components/card-render/card-render";

async function fetchCard(
  slug: string
): Promise<CardDTO | null> {
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
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <CardRender card={card} mode="initial" />
      <CardRender card={card} mode="anomaly" />
    </div>
  );
}