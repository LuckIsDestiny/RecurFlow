import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  company: z.string().trim().min(2).max(100).optional(),
});

export const userIdParam = z.object({
  id: z.uuid(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdParam>;
