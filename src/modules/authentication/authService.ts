import { prisma } from "../../common/lib/prisma";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginSchema, RegisterSchema } from "./authSchema";
import { AppError } from "../../common/utils/AppError";

export const register = async (data: RegisterSchema) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  data.password = encryptedPassword;
  const newUser = await prisma.user.create({ data });
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const login = async (data: LoginSchema) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  const { password: _, ...userWithoutPassword } = user;
  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_Secret || "secret",
    { expiresIn: "1d" },
  );
  return { user: userWithoutPassword, token };
};
