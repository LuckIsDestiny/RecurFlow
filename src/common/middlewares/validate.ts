import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

type RequestDataSource = "body" | "params" | "query";

export const validate = (
  schema: z.ZodType,
  source: RequestDataSource = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      next(error);
    }
  };
};
