import type { Request, Response } from "express";
import * as userService from "./userService";

export const createUser = async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ status: "success", data: newUser });
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ status: "success", data: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await userService.getUserById(id);
  res.status(200).json({ status: "success", data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const newUser = await userService.updateUser(id, req.body);
  res.status(200).json({ status: "success", data: newUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await userService.deleteUser(id);
  res.status(204).send();
};

export const getUserDocuments = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await userService.getUserDocuments(id);
  res.status(200).json({ status: "success", data: user?.documents });
};
