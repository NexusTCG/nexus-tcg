import { AnomalyCardType, InitialCardType } from "@/app/lib/types/database";
import { SubscriptionPlanType } from "@/app/lib/types/components";

// Types for DTOs
export type ProfileDTO = {
  user_id: string | null;
  created_at: string | null;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  plan: SubscriptionPlanType;
  credits: number;
  credits_refresh_date: string | null;
};

export type KeywordsDTO = {
  id?: number | null;
  created_at?: string | null;
  name: string | null;
  syntax: string | null;
  reminder: string | null;
  type: "persistent" | "reactive" | "active" | null;
  tip: string | null;
};

export type TermsDTO = {
  id?: number | null;
  created_at?: string | null;
  name: string | null;
  description: string | null;
  type: string | null;
};

export type CardDTO = {
  id: number | null;
  user_id: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  username?: string | null;
  grade?: string | null;
  approved?: boolean | null;
  card_render?: string | null;
  discord_post?: boolean | null;
  discord_post_url?: string | null;
  initialMode: InitialCardType;
  anomalyMode: AnomalyCardType;
};

export type CardsDTO = CardDTO[];
