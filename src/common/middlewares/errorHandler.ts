import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { z } from "zod";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.message });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation Failed",
      errors: err.issues.map((issue) => ({
        fields: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ status: "fail", message: "Resource Not Found" });
    }

    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ status: "fail", message: "Resource Already Exists" });
    }
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
};
