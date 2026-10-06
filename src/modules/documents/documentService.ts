import { prisma } from "../../common/lib/prisma";
import type {
  CreateDocumentSchema,
  UpcomingRenewalSchema,
  UpdateDocumentSchema,
} from "./documentSchema";

export const createDocuments = async (data: CreateDocumentSchema) => {
  return prisma.document.create({ data });
};

export const getDocuments = async () => {
  return prisma.document.findMany();
};

export const getUpcomingRenewals = async (data: UpcomingRenewalSchema) => {
  return prisma.document.findMany();
};

export const getExpiredDocuments = async () => {}

export const getDocumentById = async (id: string) => {
  return prisma.document.findUnique({
    where: {
      id,
    },
  });
};

export const updateDocument = async (id: string, data: UpdateDocumentSchema) => {
  return prisma.document.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteDocument = async (id: string) => {
  return prisma.document.delete({
    where: {
      id,
    },
  });
};
