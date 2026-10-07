import { prisma } from "../../common/lib/prisma";
import { AppError } from "../../common/utils/AppError";
import type {
  CreateDocumentSchema,
  UpcomingRenewalSchema,
  UpdateDocumentSchema,
} from "./documentSchema";

export const createDocuments = async (data: CreateDocumentSchema) => {
  return await prisma.document.create({ data });
};

export const getDocuments = async (userId: string) => {
  return await prisma.document.findMany({ where: { userId } });
};

export const getUpcomingRenewals = async (data: UpcomingRenewalSchema) => {
  return await prisma.document.findMany({
    where: {
      userId: data.userId,
      renewalDate: {
        gte: new Date(),
        lte: new Date(Date.now() + data.days * 24 * 60 * 60 * 1000),
      },
      status: { not: "CANCELLED" },
    },
    orderBy: {
      renewalDate: "asc",
    },
  });
};

export const getDocumentSummary = async (userId: string) => {
  const totalActivePromise = prisma.document.count({
    where: { userId, status: "ACTIVE" },
  });

  const expiredCountPromise = prisma.document.count({
    where: {
      userId,
      renewalDate: { lte: new Date() },
      status: { not: "CANCELLED" },
    },
  });

  const upcomingRenewalsCountPromise = prisma.document.count({
    where: {
      userId,
      renewalDate: {
        gte: new Date(),
        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      status: { not: "CANCELLED" },
    },
  });

  const totalCostPromise = prisma.document.aggregate({
    _sum: { cost: true },
    where: { userId, status: "ACTIVE" },
  });

  const [totalActive, expiredCount, upcomingRenewalsCount, costResult] =
    await Promise.all([
      totalActivePromise,
      expiredCountPromise,
      upcomingRenewalsCountPromise,
      totalCostPromise,
    ]);

  return {
    totalActive,
    expiredCount,
    upcomingRenewalsCount,
    totalCost: costResult._sum.cost || 0,
  };
};

export const getExpiredDocuments = async (userId: string) => {
  return await prisma.document.findMany({
    where: {
      userId,
      renewalDate: { lte: new Date() },
      status: { not: "CANCELLED" },
    },
  });
};

export const getDocumentById = async (id: string, userId: string) => {
  const document = await prisma.document.findUnique({ where: { id } });

  if (!document) {
    throw new AppError("Document Not Found", 404);
  }

  if (document.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return document;
};

export const updateDocument = async (
  id: string,
  userId: string,
  data: UpdateDocumentSchema,
) => {
  await getDocumentById(id, userId);
  return await prisma.document.update({ where: { id }, data });
};

export const renewDocument = async (id: string, userId: string) => {
  const document = await getDocumentById(id, userId);
  const currentRenewalDate = new Date(document.renewalDate);
  const nextRenewalDate = new Date(
    currentRenewalDate.setFullYear(currentRenewalDate.getFullYear() + 1),
  );
  return await prisma.document.update({
    where: { id },
    data: { status: "ACTIVE", renewalDate: nextRenewalDate },
  });
};

export const deleteDocument = async (id: string, userId: string) => {
  await getDocumentById(id, userId);
  return await prisma.document.delete({ where: { id } });
};
