// Utils
import { formatDistanceToNow } from "date-fns";
// Types
import { EnergyCost } from "@/app/lib/types/components";
import { energyOrder, energyToColorMap } from "@/app/lib/data/data";

// CALCULATIONS //

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

// GET //

export function getBaseUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  let baseUrl = isProduction
    ? process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return baseUrl.replace(/\/$/, "");
}
