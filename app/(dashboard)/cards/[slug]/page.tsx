import React, { Suspense } from "react";
// Utils
// import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
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

export const revalidate = 3600;

async function fetchCard(slug: string): Promise<CardDTO | null> {
  const baseUrl = getBaseUrl();

  // TODO: Replace slug === id with slug === initialMode.name

  const fetchUrl = `${baseUrl}/api/data/fetch-cards?id=${slug}`;

  console.log("[Server] Fetching from URL:", fetchUrl);

  const res = await fetch(fetchUrl, { next: { revalidate: 3600 } });

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

type MetadataProps = {
  params: { slug: string };
};

Generate metadata
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const card = await fetchCard(params.slug);
  const baseUrl = getBaseUrl();

  console.log("[Metadata] Generating for card:", card);
  console.log("[Metadata] Base URL:", baseUrl);

  const ogImage = `${baseUrl}/cards/${params.slug}/opengraph-image`;
  console.log("[Metadata] OG Image URL:", ogImage);

  if (!card) {
    return {
      title: "Card Not Found",
      description: "The requested card could not be found.",
    };
  }

  return {
    title: card.initialMode.name,
    description: `Check out ${card.initialMode.name}, a Nexus TCG card created by ${card.username}!`,
    openGraph: {
      title: card.initialMode.name,
      description: `Check out ${card.initialMode.name}, a Nexus TCG card created by ${card.username}!`,
      type: "article",
      url: `${baseUrl}/cards/${card.id}`,
      images: [
        {
          url: `/cards/${card.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: card.initialMode.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: card.initialMode.name,
      description: `Check out ${card.initialMode.name}, a Nexus TCG card created by ${card.username}!`,
      images: [`/cards/${card.id}/opengraph-image`],
    },
  };
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
