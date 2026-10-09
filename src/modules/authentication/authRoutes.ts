import express from "express";
import { register, login } from "./authController";
import { catchAsync } from "../../common/utils/catchAsync";

const router = express.Router();

router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));

export default router;
