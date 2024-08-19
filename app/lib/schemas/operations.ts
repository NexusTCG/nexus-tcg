import { z } from 'zod';

export const CardCommentFormSchema = z
  .object({
    card_id: z
      .number()
      .min(1, { message: "Card ID is required." }), 
    user_id: z
      .string()
      .min(1, { message: "User ID is required." }), 
    username: z
      .string()
      .min(1,{ message: "Username is required." }),
    comment: z
      .string()
      .min(1,{ message: "Comment is required." }),
    created_at: z
      .string()
      .optional()
      .nullable(),
    updated_at: z
      .string()
      .optional()
      .nullable(),
  })