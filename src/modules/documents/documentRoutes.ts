import express from "express";
import * as documentController from "./documentController";
import { catchAsync } from "../../common/utils/catchAsync";
import { authenticate } from "../../common/middlewares/authenticate";

const router = express.Router();

router.use(catchAsync(authenticate));

router.post("/", catchAsync(documentController.createDocument));
router.get("/upcoming", catchAsync(documentController.getUpcomingRenewals));
router.get("/summary", catchAsync(documentController.getDocumentSummary));
router.get("/expired", catchAsync(documentController.getExpiredDocuments));
router.get("/", catchAsync(documentController.getDocuments));
router.get("/:id", catchAsync(documentController.getDocumentById));
router.patch("/:id", catchAsync(documentController.updateDocument));
router.patch("/:id/renew", catchAsync(documentController.renewDocument));
router.delete("/:id", catchAsync(documentController.deleteDocument));

export default router;
