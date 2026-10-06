import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  name: z.string().trim().min(2).max(100).optional(),
  company: z.string().trim().min(2).max(100).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParam = z.object({
  id: z.uuid(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdParam>;
