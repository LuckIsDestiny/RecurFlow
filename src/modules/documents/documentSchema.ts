import { z } from "zod";

// Temp: remove after Authentication is added
export const userIdParam = z.object({
  userId: z.uuid(),
});

export type UserIdParam = z.infer<typeof userIdParam>;
//

export const DocumentType = [
  "CONTRACT",
  "SUBSCRIPTION",
  "INVOICE",
  "OTHER",
] as const;
export const DocumentStatus = [
  "ACTIVE",
  "CANCELLED",
  // Add when the app is expanded, and when use cron job
  // "UPCOMING_RENEWAL",
  // "EXPIRED",
] as const;

export const createDocumentSchema = z.object({
  title: z.string("Title is required").trim().min(2).max(100),
  type: z.enum(DocumentType).default("CONTRACT").optional(),
  status: z.enum(DocumentStatus).default("ACTIVE").optional(),
  fileUrl: z.url().optional(),
  startDate: z.iso.datetime().pipe(z.coerce.string()).optional(),
  renewalDate: z.iso.datetime().pipe(z.coerce.string()),
  vendor: z.string().optional(),
  cost: z.number().positive().optional(),
  currency: z.string().length(3).toUpperCase().default("USD").optional(),
  userId: z.uuid(), // remove once auth is added
});

export const updateDocumentSchema = createDocumentSchema
  .omit({ userId: true })
  .partial();

export const documentIdParam = z.object({
  id: z.uuid(),
});

export const upcomingRenewalSchema = z.object({
  days: z.string().min(1).pipe(z.coerce.number()).default(30),
  userId: z.uuid(), // Remove once auth is integrated
});

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
export type DocumentIdInput = z.infer<typeof documentIdParam>;
export type UpcomingRenewalSchema = z.infer<typeof upcomingRenewalSchema>;
