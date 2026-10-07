import type { Request, Response } from "express";
import * as documentService from "./documentService";
import {
  createDocumentSchema,
  documentIdParam,
  upcomingRenewalSchema,
  updateDocumentSchema,
  userIdParam,
} from "./documentSchema";

export const createDocument = async (req: Request, res: Response) => {
  const data = createDocumentSchema.parse(req.body);
  const document = await documentService.createDocuments(data);
  res.status(201).json({ status: "success", data: document });
};

export const getUpcomingRenewals = async (req: Request, res: Response) => {
  const data = upcomingRenewalSchema.parse(req.query);
  const documents = await documentService.getUpcomingRenewals(data);
  res.status(200).json({ status: "success", data: documents });
};

export const getExpiredDocuments = async (req: Request, res: Response) => {
  const { userId } = userIdParam.parse(req.query);
  const documents = await documentService.getExpiredDocuments(userId);
  res.status(200).json({ status: "success", data: documents });
};

export const getDocumentSummary = async (req: Request, res: Response) => {
  const { userId } = userIdParam.parse(req.query);
  const summary = await documentService.getDocumentSummary(userId);
  res.status(200).json({ status: "success", data: summary });
};

export const getDocuments = async (req: Request, res: Response) => {
  const { userId } = userIdParam.parse(req.query);
  const documents = await documentService.getDocuments(userId);
  res.status(201).json({ status: "success", data: documents });
};

export const getDocumentById = async (req: Request, res: Response) => {
  const { id } = documentIdParam.parse(req.params);
  const { userId } = userIdParam.parse(req.query);
  const document = await documentService.getDocumentById(id, userId);
  res.status(200).json({ status: "success", data: document });
};

export const updateDocument = async (req: Request, res: Response) => {
  const { id } = documentIdParam.parse(req.params);
  const { userId } = userIdParam.parse(req.query);
  const data = updateDocumentSchema.parse(req.body);
  const document = await documentService.updateDocument(id, userId, data);
  res.status(200).json({ status: "success", data: document });
};

export const renewDocument = async (req: Request, res: Response) => {
  const { id } = documentIdParam.parse(req.params);
  const { userId } = userIdParam.parse(req.query);
  const document = await documentService.renewDocument(id, userId);
  res.status(200).json({ status: "success", data: document });
};

export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = documentIdParam.parse(req.params);
  const { userId } = userIdParam.parse(req.query);
  await documentService.deleteDocument(id, userId);
  res.status(204).send();
};
