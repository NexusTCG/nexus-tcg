import React, { Suspense } from "react";
// Utils
import { redirect } from "next/navigation";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Custom components
import CardRender from "@/components/card-render/card-render";
import ClientWrapper from "@/components/card-render/client-wrapper";
import CardFooter from "@/components/card-render/card-render-footer";
async function fetchCard(
  slug: string
): Promise<CardDTO | null> {
  const isProduction = process.env.NODE_ENV === 'production';
  let baseUrl: string;

  if (isProduction) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`;
  } else {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }

  baseUrl = baseUrl.replace(/\/$/, ''); // Remove any trailing slash
  const fetchUrl = `${baseUrl}/api/data/fetch-cards?id=${slug}`;

  console.log('[Server] Fetching from URL:', fetchUrl);
  
  const res = await fetch(fetchUrl, { cache: 'no-store' });
  
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

  async function toggleMode() {
    "use server";
    const newMode = activeMode === "initial" ? "anomaly" : "initial";
    redirect(`/cards/${params.slug}?mode=${newMode}`);
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
          gap-4
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
            toggleMode={toggleMode}
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
            <CardFooter />
          </ClientWrapper>
        </div>
      </div>
  );
}