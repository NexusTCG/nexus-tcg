// Utils
import { formatDistanceToNow } from "date-fns";
// Types
import {
  EnergyCost,
  SocialPlatform,
  SocialShareData,
} from "@/app/lib/types/components";
// Data
import {
  energyOrder,
  energyToColorMap,
  socialPlatforms,
} from "@/app/lib/data/data";

// --> CALCULATIONS <-- //

export function calculateTimeAgo(
  date: string | null | undefined,
): string {
  if (!date) return "Unknown";
  return formatDistanceToNow(
    new Date(date),
    {
      addSuffix: true,
    },
  );
}

export function calculateBgColor(
  energyCost: EnergyCost | null,
  shade: number = 50,
): string[] {
  if (!energyCost || Object.values(energyCost).every((cost) => cost === 0)) {
    return [`bg-neutral-${shade}`];
  }

  const activeTypes = Object.entries(energyCost)
    .filter(([_, value]) => value > 0)
    .map(([type]) => type);

  if (activeTypes.length === 0) {
    return [`bg-neutral-${shade}`];
  }

  if (activeTypes.includes("void") && activeTypes.length === 1) {
    return [`bg-slate-${shade}`];
  }

  const nonVoidTypes = activeTypes.filter((type) => type !== "void");

  if (nonVoidTypes.length === 1) {
    const colorName =
      energyToColorMap[nonVoidTypes[0] as keyof typeof energyToColorMap];
    return [`bg-${colorName}-${shade}`];
  }

  if (nonVoidTypes.length === 2) {
    const sortedTypes = nonVoidTypes.sort((a, b) =>
      energyOrder.indexOf(a) - energyOrder.indexOf(b)
    );
    const gradientName = sortedTypes.join("-").toLowerCase();
    return [`bg-${gradientName}-${shade}`];
  }

  return [`bg-multi-${shade}`];
}

// --> URL <-- //

export function getBaseUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  let baseUrl = isProduction
    ? process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return baseUrl.replace(/\/$/, "");
}

// --> SOCIAL SHARING <-- //

export async function shareToSocial(
  platform: SocialPlatform,
  data: SocialShareData,
): Promise<void> {
  const platformData = socialPlatforms[platform];

  if (!platformData) {
    throw new Error(`Unsupported social platform: ${platform}`);
  }

  try {
    if (platform === "discord") {
      const response = await fetch("/api/data/post-card-to-discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to trigger Discord post");
      }

      // Open the Discord channel in a new tab
      window.open(
        "https://discord.com/channels/1136652718929362985/1209430105940824074",
        "_blank",
      );
    } else {
      const shareUrl = await platformData.shareFunction(data);
      window.open(shareUrl, "_blank");
    }
  } catch (error) {
    console.error(`Error sharing to ${platform}:`, error);
    throw error;
  }
}
