import React, { Suspense } from "react";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Actions
import { getBaseUrl } from '@/app/utils/actions/actions';
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Custom components
import CardRender from "@/components/card-render/card-render";
import ClientWrapper from "@/components/card-render/client-wrapper";
import CardRenderArtDirection from "@/components/card-render/card-render-art-direction";

// TODO: If open for the first time, use htmm-to-image to convert both renders to JPEG upload to public Supabase bucket
// TODO: Implement functionality to download images from Supabase bucket
// TODO: Implement share functionality

export const revalidate = 3600;

async function fetchCard(
  slug: string
): Promise<CardDTO | null> {
  const baseUrl = getBaseUrl();
  const fetchUrl = `${baseUrl}/api/data/fetch-cards?id=${slug}`;

  console.log('[Server] Fetching from URL:', fetchUrl);
  
  // const res = await fetch(fetchUrl, { cache: 'no-store' });
  const res = await fetch(fetchUrl, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    console.error('[Server] Fetch failed:', res.status, res.statusText);
    throw new Error('Failed to fetch card');
  }

  const data = await res.json();
  return data[0] || null;
}

function CardSkeleton() {
  return (
    <Skeleton
      style={{ borderRadius: "16px" }}
      className="w-[400px] h-[560px] absolute"
    />
  );
}

export default async function CardSlug({ 
  params,
  searchParams 
}: { 
  params: { slug: string },
  searchParams: { mode?: "initial" | "anomaly" } 
}) {
  const user = await getUserProfileDTO();
  const card = await fetchCard(params.slug);
  const activeMode = searchParams.mode || "initial";

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div
      id={`${card.id}-page-container`}
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        px-4
        md:px-8
        py-4
        gap-8
      "
    >
      <div 
        id={`${card.id}-content-container`}
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
        <ClientWrapper
          user={user}
          card={card} 
          activeMode={activeMode}
        >
          <Suspense fallback={<CardSkeleton />}>
            <CardRender
              card={card}
              mode="initial"
              isActive={activeMode === "initial"}
            />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <CardRender
              card={card}
              mode="anomaly"
              isActive={activeMode === "anomaly"}
            />
          </Suspense>
        </ClientWrapper>
      </div>
      <Suspense fallback={null}>
        <CardRenderArtDirection
          card={card}
          activeMode={activeMode}
        />
      </Suspense>
    </div>
  );
}