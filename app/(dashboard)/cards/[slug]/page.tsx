import React from "react";
// Utils
import Image from "next/image";
// DTO
import { CardDTO } from "@/app/lib/types/dto";

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
      {/* <CardDisplay card={card} /> */}
      {/* Component to display the card */}
      {card.initialMode.name} by {card.username}
      {/* Need to upload images to Supabase bucket and then to the database */}
      <Image 
        src={card.initialMode.art_options?.[card.initialMode.art_selected] || ''} 
        alt={card.initialMode.name} 
        width={200} 
        height={200} 
      />
    </div>
  );
}