import { z } from 'zod';

export type KeywordsType = {
  id?: number;
  created_at?: string;
  name: string;
  reminder: string;
  type: "persistent" | "reactive" | "active";
  tip?: "string";
}

export type GlossaryTermType = {
  id?: number;
  created_at?: string;
  name: string;
  description: string;
  type: "action" | "turn" | "phase" | "step";
  tip?: "string";
}