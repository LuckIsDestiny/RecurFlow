import type { Request, Response } from "express";
import * as userService from "./userService";
import { updateUserSchema, userIdParam } from "./userSchema";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ status: "success", data: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = userIdParam.parse(req.params);
  const user = await userService.getUserById(id);
  res.status(200).json({ status: "success", data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = userIdParam.parse(req.params);
  const data = updateUserSchema.parse(req.body);
  const newUser = await userService.updateUser(id, data);
  res.status(200).json({ status: "success", data: newUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = userIdParam.parse(req.params);
  await userService.deleteUser(id);
  res.status(204).send();
};

export const getUserDocuments = async (req: Request, res: Response) => {
  const { id } = userIdParam.parse(req.params);
  const user = await userService.getUserDocuments(id);
  res.status(200).json({ status: "success", data: user?.documents });
};
