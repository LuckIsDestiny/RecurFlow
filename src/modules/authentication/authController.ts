import type { Request, Response } from "express";
import * as authService from "./authService";
import { loginSchema, registerSchema } from "./authSchema";

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const newUser = await authService.register(data);
  res.status(201).json({ status: "success", data: newUser });
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const newUser = await authService.login(data);
  res.status(200).json({ status: "success", data: newUser });
};
