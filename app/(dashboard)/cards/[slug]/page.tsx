import React, { Suspense } from "react";
// Utils
import { redirect } from "next/navigation";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Custom components
import CardRender from "@/components/card-render/card-render";
import ClientWrapper from "@/components/card-render/client-wrapper";

async function fetchCard(
  slug: string
): Promise<CardDTO | null> {
  const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const res = await fetch(
    `${defaultUrl}/api/data/fetch-cards?id=${slug}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
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
          </ClientWrapper>
        </div>
      </div>
  );
}