import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import type { Role } from "../../generated/prisma/enums";

export const restrictTo = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};
