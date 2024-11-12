// Utils
import { formatDistanceToNow } from "date-fns";
// Types
import {
  EnergyCost,
  SocialPlatform,
  SocialShareData,
} from "@/app/lib/types/components";
import { StoredCardForm } from "@/app/lib/types/forms";
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
): Promise<{ success: boolean; shareUrl?: string; error?: string }> {
  const platformData = socialPlatforms[platform];

  if (!platformData) {
    return {
      success: false,
      error: `Unsupported social platform: ${platform}`,
    };
  }

  try {
    const shareUrl = await platformData.shareFunction(data);
    return { success: true, shareUrl };
  } catch (error) {
    console.error(`Error sharing to ${platform}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// --> CARD CREATION <-- //

export function saveCardFormToStorage(formData: any) {
  try {
    const storedForm: StoredCardForm = {
      lastUpdated: new Date().toISOString(),
      formData,
    };
    localStorage.setItem("nexus-card-form-draft", JSON.stringify(storedForm));
  } catch (error) {
    console.error("Error saving card form to storage:", error);
  }
}

export function getCardFormFromStorage(): StoredCardForm | null {
  try {
    const stored = localStorage.getItem("nexus-card-form-draft");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error retrieving card form from storage:", error);
    return null;
  }
}

export function clearCardFormStorage() {
  localStorage.removeItem("nexus-card-form-draft");
}
