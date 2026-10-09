import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().trim().min(8).max(20),
  name: z.string().trim().min(2).max(100).optional(),
  company: z.string().trim().min(2).max(100).optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().trim().min(8).max(20),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
