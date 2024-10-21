export type KeywordsType = {
  id?: number;
  created_at?: string;
  name: string;
  reminder: string;
  type: "persistent" | "reactive" | "active";
  tip?: "string";
};

export type GlossaryTermType = {
  id?: number;
  created_at?: string;
  name: string;
  description: string;
  type: "action" | "turn" | "phase" | "step";
  tip?: "string";
};

export type ArtDirectionOption = {
  section: string;
  option: number;
};

export type InitialCardType = {
  id?: number;
  card_id?: number;
  render?: string;
  name: string;
  type: "agent" | "anomaly" | "event" | "hardware" | "software";
  type_sub?: string;
  mythic: boolean;
  text?: string;
  lore?: string;
  prompt_art?: string;
  energy_value: number;
  energy_cost: {
    light?: number;
    storm?: number;
    dark?: number;
    chaos?: number;
    growth?: number;
    void?: number;
  };
  speed: number;
  attack?: number;
  defense?: number;
  reach?: boolean;
  art_selected: number;
  art_direction_options?: ArtDirectionOption[];
  keywords?: string;
  art_options?: string;
};

export type AnomalyCardType = {
  id?: number;
  card_id?: number;
  render?: string;
  name: string;
  mythic: boolean;
  uncommon: boolean;
  text?: string;
  lore?: string;
  prompt_art?: string;
  art_selected: number;
  art_direction_options?: ArtDirectionOption[];
  art_options?: string;
};

export type NexusCardType = {
  id?: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  username: string;
  grade: string;
  approved: boolean;
  card_render?: string[];
  discord_post?: boolean;
  discord_post_url?: string;
};

export type NexusCardsType = NexusCardType[];
