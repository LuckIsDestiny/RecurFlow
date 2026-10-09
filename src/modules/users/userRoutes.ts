import express from "express";
import * as userController from "./userController";
import { catchAsync } from "../../common/utils/catchAsync";
import { authenticate } from "../../common/middlewares/authenticate";
import { restrictTo } from "../../common/middlewares/restrictTo";

const router = express.Router();

router.use(catchAsync(authenticate));

router.get("/", restrictTo("ADMIN"), catchAsync(userController.getUsers));
router.get("/:id", catchAsync(userController.getUserById));
router.get("/:id/documents", catchAsync(userController.getUserDocuments));
router.patch("/:id", catchAsync(userController.updateUser));
router.delete("/:id", catchAsync(userController.deleteUser));

export default router;
