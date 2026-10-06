import express from "express";
import {
  createUser,
  getUserById,
  getUserDocuments,
  getUsers,
  updateUser,
} from "./userController";
import { validate } from "../../common/middlewares/validate";
import { createUserSchema, updateUserSchema, userIdParam } from "./userSchema";
import { catchAsync } from "../../common/utils/catchAsync";

const router = express.Router();

router.post("/", validate(createUserSchema), catchAsync(createUser));
router.get("/", catchAsync(getUsers));
router.get("/:id", validate(userIdParam, "params"), catchAsync(getUserById));
router.patch(
  "/:id",
  validate(userIdParam, "params"),
  validate(updateUserSchema),
  catchAsync(updateUser),
);
router.get(
  "/:id/documents",
  validate(userIdParam, "params"),
  catchAsync(getUserDocuments),
);

export default router;
