import { z } from "zod";

export const EnergySchema = z
  .object({
    light: z.string().default("light").nullable().optional(),
    storm: z.string().default("storm").nullable().optional(),
    dark: z.string().default("dark").nullable().optional(),
    chaos: z.string().default("chaos").nullable().optional(),
    growth: z.string().default("growth").nullable().optional(),
    void: z.string().default("void").nullable().optional(),
  });

export const EnergyCostSchema = z
  .object({
    light: z.number().int().min(0).default(0).optional(),
    storm: z.number().int().min(0).default(0).optional(),
    dark: z.number().int().min(0).default(0).optional(),
    chaos: z.number().int().min(0).default(0).optional(),
    growth: z.number().int().min(0).default(0).optional(),
    void: z.number().int().min(0).default(0).optional(),
    voidx: z.boolean().default(false).nullable().optional(),
  });

export const SpeedTypeSchema = z
  .object({
    speed1: z.number().default(1).nullable().optional(),
    speed2: z.number().default(2).nullable().optional(),
    speed3: z.number().default(3).nullable().optional(),
  });

export const CardTypeSchema = z
  .enum([
    "agent",
    "anomaly",
    "event",
    "hardware",
    "software",
  ]);

export const CardFormSchema = z.object({
  id: z.number().nullable().optional(),
  user_id: z.string().nullable(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().min(1, { message: "Username is required." }).default(
    "Username",
  ),
  postToDiscord: z.boolean().default(true),
  approved: z.boolean().default(false),
  grade: z.string().default("core"),
  initialMode: z.object({
    render: z.string().nullable(),
    name: z.string().min(1, { message: "Card name is required." }).default(
      "Card name",
    ),
    type: z.string().min(1, { message: "Card type is required." }).default(
      "agent",
    ),
    type_sub: z.array(z.string()),
    type_super: z.string().nullable().optional(),
    mythic: z.boolean().default(false),
    text: z.array(z.string()),
    keywords: z.array(z.string()),
    lore: z.string().nullable().optional(),
    prompt_art: z.string().nullable(),
    art_options: z.array(z.string()).default([]),
    art_selected: z.number().default(0),
    energy_value: z.number().default(0),
    energy_cost: EnergyCostSchema,
    speed: z.number().default(1),
    attack: z.number().default(0),
    defense: z.number().default(0),
    reach: z.boolean().default(false),
  }),
  anomalyMode: z.object({
    render: z.string().nullable(),
    name: z.string().min(1, { message: "Card name is required." }).default(
      "Common Anomaly",
    ),
    mythic: z.boolean().default(false),
    uncommon: z.boolean().default(false),
    text: z.array(z.string()),
    lore: z.string().nullable().optional(),
    prompt_art: z.string().nullable(),
    art_options: z.array(z.string()).default([]),
    art_selected: z.number().default(0),
  }),
});
