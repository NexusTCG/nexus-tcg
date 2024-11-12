// Types for forms
import { z } from "zod";
import {
  CardFormSchema,
  CardTypeSchema,
  EnergyCostSchema,
  EnergySchema,
  SpeedTypeSchema,
} from "@/app/lib/schemas/database";

// Card creator form types
export type Energy = z.infer<typeof EnergySchema>;
export type EnergyCost = z.infer<typeof EnergyCostSchema>;
export type SpeedType = z.infer<typeof SpeedTypeSchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
export type CardFormDataType = z.infer<typeof CardFormSchema>;

// Misc form types
export type CardCommentFormType = {
  card_id: number;
  user_id: string;
  username: string;
  comment: string;
  created_at: string;
  updated_at: string;
};

// Type for local storage of form state
export type StoredCardForm = {
  lastUpdated: string;
  formData: any;
};
