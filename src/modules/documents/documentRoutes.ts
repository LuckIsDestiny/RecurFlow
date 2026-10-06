import express from "express";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  getDocumentSummary,
  getExpiredDocuments,
  getUpcomingRenewals,
  renewDocument,
  updateDocument,
} from "./documentController";
import {
  createDocumentSchema,
  documentIdParam,
  upcomingRenewalSchema,
  updateDocumentSchema,
} from "./documentSchema";
import { validate } from "../../common/middlewares/validate";
import { catchAsync } from "../../common/utils/catchAsync";

const router = express.Router();

router.post(
  "/",
  validate(createDocumentSchema, "body"),
  catchAsync(createDocument),
);
router.get(
  "/upcoming",
  validate(upcomingRenewalSchema, "query"),
  catchAsync(getUpcomingRenewals),
);
router.get("/summary", catchAsync(getDocumentSummary));
router.get("/expired", catchAsync(getExpiredDocuments));
router.get("/", getDocuments);
router.get(
  "/:id",
  validate(documentIdParam, "params"),
  catchAsync(getDocumentById),
);
router.patch(
  "/:id",
  validate(documentIdParam, "params"),
  validate(updateDocumentSchema, "body"),
  catchAsync(updateDocument),
);
router.patch(
  "/:id/renew",
  validate(documentIdParam, "params"),
  catchAsync(renewDocument),
);
router.delete(
  "/:id",
  validate(documentIdParam, "params"),
  catchAsync(deleteDocument),
);

export default router;
