import { prisma } from "../../common/lib/prisma";
import { AppError } from "../../common/utils/AppError";
import type { CreateUserSchema, UpdateUserSchema } from "./userSchema";

export const createUser = async (data: CreateUserSchema) => {
  return await prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUser = async (id: string, data: UpdateUserSchema) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};

export const getUserDocuments = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      documents: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
