import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { prisma } from "../lib/prisma";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401),
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret || "secret") as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = { id: decoded.userId, role: user.role };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
