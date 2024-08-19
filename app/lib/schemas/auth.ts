import { z } from "zod";

export const UserProfileSchema = z.object({
  username: z.string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(16, {
      message: "Username must be no longer than 16 characters."
    }),
  avatar_url: z.string().optional(),
  bio: z.string()
    .max(150, {
      message: "Bios must be no longer than 150 characters."
    })
    .optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})