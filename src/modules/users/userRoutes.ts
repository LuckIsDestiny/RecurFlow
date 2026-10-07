import express from "express";
import * as userController from "./userController";
import { catchAsync } from "../../common/utils/catchAsync";

const router = express.Router();

router.post("/", catchAsync(userController.createUser));
router.get("/", catchAsync(userController.getUsers));
router.get("/:id", catchAsync(userController.getUserById));
router.get("/:id/documents", catchAsync(userController.getUserDocuments));
router.patch("/:id", catchAsync(userController.updateUser));
router.delete("/:id", catchAsync(userController.deleteUser));

export default router;
