import React, { Suspense } from "react";
// Utils
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// Types
import { CardDTO } from "@/app/lib/types/dto";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
// Actions
import { getBaseUrl } from "@/app/utils/actions/actions";
// Components
import { Skeleton } from "@/components/ui/skeleton";
// Custom components
import CardRender from "@/components/card-render/card-render";
import ClientWrapper from "@/components/card-render/client-wrapper";
import CardRenderArtDirection from "@/components/card-render/card-render-art-direction";

// Preloading card grade icons for Puppeteer
export const metadata = {
  other: {
    preload: [
      { href: "/icons/grade-icons/core.png", as: "image" },
      { href: "/icons/grade-icons/rare.png", as: "image" },
      { href: "/icons/grade-icons/epic.png", as: "image" },
      { href: "/icons/grade-icons/prime.png", as: "image" },
    ],
  },
};

async function fetchCard(slug: string): Promise<CardDTO | null> {
  const baseUrl = getBaseUrl();
  const fetchUrl = `${baseUrl}/api/data/fetch-cards?id=${slug}`;
  console.log("[Server] Fetching from URL:", fetchUrl);

  // Check if request is from puppeteer
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent");
  const isPuppeteer = userAgent?.includes("HeadlessChrome");

  console.log("[Server] Request is from puppeteer:", isPuppeteer);

  // Fetch card data with conditional caching
  const res = await fetch(fetchUrl, {
    cache: isPuppeteer ? "no-store" : "force-cache",
    next: isPuppeteer ? { revalidate: 0 } : { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("[Server] Fetch failed:", res.status, res.statusText);
    throw new Error("Failed to fetch card");
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

export default async function CardSlug(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  // Validate mode
  const validModes = ["initial", "anomaly"] as const;
  const requestedMode = searchParams.mode?.toLowerCase();

  // Redirect if mode is not specified
  if (
    !requestedMode ||
    !validModes.includes(requestedMode as (typeof validModes)[number])
  ) {
    redirect(`/cards/${params.slug}?mode=initial`);
  }

  // Fetch user and card data
  const user = await getUserProfileDTO();
  const card = await fetchCard(params.slug);

  if (!card) {
    return <div>Card not found</div>;
  }

  const activeMode = searchParams.mode as (typeof validModes)[number];

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
        <ClientWrapper user={user} card={card} activeMode={activeMode}>
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
        <CardRenderArtDirection card={card} activeMode={activeMode} />
      </Suspense>
    </div>
  );
}
