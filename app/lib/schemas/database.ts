import { z } from 'zod';

export const EnergySchema = z
  .object({
    light: z.string().default("light").nullable().optional(),
    storm: z.string().default("storm").nullable().optional(),
    dark: z.string().default("dark").nullable().optional(),
    chaos: z.string().default("chaos").nullable().optional(),
    growth: z.string().default("growth").nullable().optional(),
    void: z.string().default("void").nullable().optional(),
  })

export const EnergyCostSchema = z
  .object({
    light: z.number().int().min(0).default(0).optional(),
    storm: z.number().int().min(0).default(0).optional(),
    dark: z.number().int().min(0).default(0).optional(),
    chaos: z.number().int().min(0).default(0).optional(),
    growth: z.number().int().min(0).default(0).optional(),
    void: z.number().int().min(0).default(0).optional(),
    voidx: z.boolean().default(false).nullable().optional(),
  })

export const SpeedTypeSchema = z
  .object({
    speed1: z.number().default(1).nullable().optional(),
    speed2: z.number().default(2).nullable().optional(),
    speed3: z.number().default(3).nullable().optional(),
  })

export const CardTypeSchema = z
  .enum([
    'agent', 
    'anomaly', 
    'event', 
    'hardware', 
    'software'
  ]);


export const InitialModeCardSchema = z
  .object({
    id: z
      .number()
      .optional() // Not available on creation
      .nullable(),
    user_id: z
      .string()
      .min(1, { message: "User is required." })
      .nullable(),
    anomaly_mode_card_id: z
      .number()
      .optional()
      .nullable(),
    created_at: z
      .string()
      .nullable()
      .optional(),
    updated_at: z
      .string()
      .nullable()
      .optional(),
    username: z
      .string()
      .min(1, { message: "Username is required." })
      .default("Username"),
    name: z
      .string()
      .min(1, { message: "Card name is required." })
      .default("Card name"),
    type: z
      .string()
      .min(1, { message: "Card type is required." })
      .default("agent"),
    type_sub: z
      .array(z.string())
      .nullable()
      .optional(),
    type_super: z
      .string()
      .nullable()
      .optional(),
    grade: z
      .string()
      .min(1, {
        message: "Card grade is required"
      })
      .default("core"),
    text: z
      .array(z.string())
      .nullable()
      .optional(), // Array
    lore: z
      .string()
      .nullable()
      .optional(),
    // TODO: Add prompt_card
    prompt_art: z
      .string()
      .nullable()
      .optional(),
    art_options: z
      .array(z.string())
      .default(["/public/images/default-art.jpg"]), // Array
    render: z
      .string()
      .nullable()
      .optional(),
    energy_value: z
      .number()
      .min(0, { message: "Energy value must be at least 0." })
      .default(0),
    energy_cost: EnergyCostSchema,
    energy_types: EnergySchema,
    speed: z
      .number()
      .default(1),
    attack: z
      .number()
      .default(0)
      .nullable()
      .optional(),
    defense: z
      .number()
      .default(0)
      .nullable()
      .optional(),
    range: z
      .string()
      .nullable()
      .optional(),
  })

  export const AnomalyModeCardSchema = z
  .object({
    id: z
      .number()
      .optional(), // Not available on creation
    user_id: z
      .string()
      .min(1, { message: "User is required." }),
    initial_mode_card_id: z
      .number()
      .optional()
      .nullable(),
    created_at: z
      .string()
      .nullable()
      .optional(),
    updated_at: z
      .string()
      .nullable()
      .optional(),
    username: z
      .string()
      .min(1, { message: "Username is required." }),
    name: z
      .string()
      .min(1, { message: "Card name is required." }),
    type: z
      .string()
      .min(1, { message: "Card type is required." })
      .default("anomaly"),
    type_sub: z
      .string()
      .min(1, { message: "Card type is required." })
      .default("common"),
    type_super: z
      .string()
      .nullable()
      .optional(),
    // Anomaly mode grade depends on initial mode
    text: z
      .array(z.string())
      .nullable()
      .optional(), // Array
    lore: z
      .string()
      .nullable()
      .optional(),
    // TODO: Add prompt_card
    prompt_art: z
      .string()
      .nullable()
      .optional(),
    art_options: z
      .array(z.string())
      .default(["url-to-default-anomaly-art.jpg"]), // Array
    render: z
      .string()
      .nullable()
      .optional(),
  })