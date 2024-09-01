// Types for DTOs
export type ProfileDTO = {
  user_id: string | null; // Needed?
  created_at: string | null;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
};

export type KeywordsDTO = {
  id?: number | null;
  created_at?: string | null;
  name: string | null;
  reminder: string | null;
  type: "persistent" | "reactive" | "active" | null;
  tip: string | null;
};