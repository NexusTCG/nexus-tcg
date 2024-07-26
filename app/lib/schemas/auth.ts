import { z } from "zod";

// TODO: Remove this and use OAuth instead

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/;

// Schema: Register form
export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(48, { message: "Password must be less than 100 characters long" })
    .regex(passwordPattern, {
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Schema: Login form
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(48, { message: "Password must be less than 100 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
});

// Schema: Password
export const PasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long"})
    .max(48, { message: "Password must be less than 100 characters long" })
    .regex(passwordPattern, {
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Schema: Password reset
export const PasswordResetSchema = z.object({
  resetEmail: z.string().email({ message: "Invalid email address" }),
});