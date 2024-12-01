import { socialPlatforms } from "@/app/lib/data/data";

// --> ENERGY & SPEED <-- //

export type EnergyType =
  | "light"
  | "storm"
  | "dark"
  | "chaos"
  | "growth"
  | "void";

export type EnergyCost = {
  light: number;
  storm: number;
  dark: number;
  chaos: number;
  growth: number;
  void: number;
};

export type SpeedType = 1 | 2 | 3;

// --> ART PROMPT <-- //

export type ArtPromptOptionType = {
  id: number;
  option: string;
  image: string | null;
  description: string | null;
  prompt: string | null;
};

export type ArtPromptOptionsSectionType = {
  title: string;
  icon: React.ElementType;
  options: ArtPromptOptionType[];
};

export type ArtPromptOptionsType = {
  [section: string]: ArtPromptOptionsSectionType;
};

// --> SOCIAL SHARING <-- //

export type SocialShareData = {
  cardId: number;
  cardName: string;
  cardCreator: string;
  shareText: string;
  shareUrl: string;
};

export type SocialPlatformData = {
  name: string;
  icon: React.ComponentType;
  shareFunction: (data: SocialShareData) => Promise<string>;
  getShareUrl?: () => string;
  color: string;
  description: string;
};

export type SocialPlatform = keyof typeof socialPlatforms;

export type SocialPlatforms = {
  [key in SocialPlatform]: SocialPlatformData;
};

// --> KEYWORDS <-- //

export type RenderedKeywordType = {
  name: string;
  input?: string;
};

export type RenderedKeywordsType = RenderedKeywordType[] | null | undefined;

// --> HOOKS <-- //

export type SubscriptionPlanType = "core" | "rare" | "epic" | "prime";

export type SubscriptionDataType = {
  plan: SubscriptionPlanType;
  credits: number;
  daysUntilRefresh: number | null;
  isLoading: boolean;
  error: Error | null;
  refreshSubscription: () => Promise<void>;
};

// --> STRIPE <-- //

export const TIER_CONFIG = {
  core: {
    credits: 10,
    name: "Core",
  },
  rare: {
    credits: 25,
    name: "Rare",
    priceId: process.env.STRIPE_RARE_PRICE_ID,
  },
  epic: {
    credits: 50,
    name: "Epic",
    priceId: process.env.STRIPE_EPIC_PRICE_ID,
  },
  prime: {
    credits: 100,
    name: "Prime",
    priceId: process.env.STRIPE_PRIME_PRICE_ID,
  },
} as const;

export type TierName = keyof typeof TIER_CONFIG;
