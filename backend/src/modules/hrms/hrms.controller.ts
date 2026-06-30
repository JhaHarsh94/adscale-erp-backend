import { ReviewRating, AppraisalStatus, WarningType, WarningStatus, type Prisma } from "@prisma/client";
import { Response } from "express";
import prisma from "../../config/prisma";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

const clean = (value: unknown) => {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str || null;
};
const enumValue = <T extends Record<string, string>>(values: T, value: unknown, fallback: T[keyof T]) =>
  Object.values(values).includes(String(value)) ? String(value) as T[keyof T] : fallback;

const empSelect = { id: true, employeeCode: true, user: { select: { id: true, name: true, email: true } } };

/* ─── Dashboard ─── */
export const dashboard = asyncHandler(async (req, res) => {
  const [totalReviews, totalAppraisals, totalPromotions, totalWarnings] = await Promise.all([
    prisma.performanceReview.count(),
    prisma.appraisal.count(),
    prisma.promotion.count(),
    prisma.warning.count(),
  ]);
  return successResponse(res, 200, "HRMS dashboard", { totalReviews, totalAppraisals, totalPromotions, totalWarnings });
});

/* ─── Performance Reviews ─── */
export const listReviews = asyncHandler(async (req, res) => {
  const where: Prisma.PerformanceReviewWhereInput = {};
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  const reviews = await prisma.performanceReview.findMany({
    where,
    include: { employee: { select: empSelect }, reviewer: { select: empSelect } },
    orderBy: { reviewDate: "desc" },
  });
  return successResponse(res, 200, "Reviews fetched", reviews);
});

export const getReview = asyncHandler(async (req, res) => {
  const review = await prisma.performanceReview.findUnique({ where: { id: req.params.id }, include: { employee: { select: empSelect }, reviewer: { select: empSelect } } });
  if (!review) throw new AppError("Review not found", 404);
  return successResponse(res, 200, "Review fetched", review);
});

export const createReview = asyncHandler(async (req, res) => {
  if (!req.body.employeeId || !req.body.reviewDate) throw new AppError("employeeId and reviewDate are required", 400);
  const review = await prisma.performanceReview.create({
    data: {
      employeeId: req.body.employeeId,
      reviewerId: clean(req.body.reviewerId),
      reviewDate: new Date(req.body.reviewDate),
      rating: enumValue(ReviewRating, req.body.rating, ReviewRating.THREE),
      feedback: clean(req.body.feedback),
      goals: clean(req.body.goals),
      strengths: clean(req.body.strengths),
      improvements: clean(req.body.improvements),
    },
    include: { employee: { select: empSelect }, reviewer: { select: empSelect } },
  });
  return successResponse(res, 201, "Review created", review);
});

export const updateReview = asyncHandler(async (req, res) => {
  const data: Prisma.PerformanceReviewUpdateInput = {};
  if (req.body.rating) data.rating = enumValue(ReviewRating, req.body.rating, ReviewRating.THREE);
  if (req.body.feedback !== undefined) data.feedback = clean(req.body.feedback) || undefined;
  if (req.body.goals !== undefined) data.goals = clean(req.body.goals) || undefined;
  if (req.body.strengths !== undefined) data.strengths = clean(req.body.strengths) || undefined;
  if (req.body.improvements !== undefined) data.improvements = clean(req.body.improvements) || undefined;
  if (req.body.nextReviewDate) data.nextReviewDate = new Date(req.body.nextReviewDate);
  const review = await prisma.performanceReview.update({ where: { id: req.params.id }, data, include: { employee: { select: empSelect }, reviewer: { select: empSelect } } });
  return successResponse(res, 200, "Review updated", review);
});

export const deleteReview = asyncHandler(async (req, res) => {
  await prisma.performanceReview.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Review deleted");
});

/* ─── Appraisals ─── */
export const listAppraisals = asyncHandler(async (req, res) => {
  const where: Prisma.AppraisalWhereInput = {};
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  if (req.query.status) where.status = enumValue(AppraisalStatus, req.query.status, AppraisalStatus.DRAFT);
  const appraisals = await prisma.appraisal.findMany({
    where,
    include: { employee: { select: empSelect }, reviewer: { select: empSelect } },
    orderBy: { reviewDate: "desc" },
  });
  return successResponse(res, 200, "Appraisals fetched", appraisals);
});

export const createAppraisal = asyncHandler(async (req, res) => {
  if (!req.body.employeeId || !req.body.reviewDate) throw new AppError("employeeId and reviewDate are required", 400);
  const appraisal = await prisma.appraisal.create({
    data: {
      employeeId: req.body.employeeId,
      reviewDate: new Date(req.body.reviewDate),
      reviewerId: clean(req.body.reviewerId),
      currentCtc: req.body.currentCtc || null,
      newCtc: req.body.newCtc || null,
      incrementPct: req.body.incrementPct || null,
      rating: enumValue(ReviewRating, req.body.rating, ReviewRating.THREE),
      comments: clean(req.body.comments),
      effectiveDate: req.body.effectiveDate ? new Date(req.body.effectiveDate) : null,
    },
    include: { employee: { select: empSelect }, reviewer: { select: empSelect } },
  });
  return successResponse(res, 201, "Appraisal created", appraisal);
});

export const updateAppraisal = asyncHandler(async (req, res) => {
  const data: Prisma.AppraisalUpdateInput = {};
  if (req.body.rating) data.rating = enumValue(ReviewRating, req.body.rating, ReviewRating.THREE);
  if (req.body.currentCtc !== undefined) data.currentCtc = req.body.currentCtc;
  if (req.body.newCtc !== undefined) data.newCtc = req.body.newCtc;
  if (req.body.incrementPct !== undefined) data.incrementPct = req.body.incrementPct;
  if (req.body.comments !== undefined) data.comments = clean(req.body.comments) || undefined;
  if (req.body.status) {
    data.status = enumValue(AppraisalStatus, req.body.status, AppraisalStatus.DRAFT);
    if (req.body.status === "ACKNOWLEDGED") data.acknowledgedAt = new Date();
  }
  if (req.body.effectiveDate) data.effectiveDate = new Date(req.body.effectiveDate);
  const appraisal = await prisma.appraisal.update({ where: { id: req.params.id }, data, include: { employee: { select: empSelect }, reviewer: { select: empSelect } } });
  return successResponse(res, 200, "Appraisal updated", appraisal);
});

export const deleteAppraisal = asyncHandler(async (req, res) => {
  await prisma.appraisal.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Appraisal deleted");
});

/* ─── Promotions ─── */
export const listPromotions = asyncHandler(async (req, res) => {
  const where: Prisma.PromotionWhereInput = {};
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  const promotions = await prisma.promotion.findMany({
    where,
    include: { employee: { select: empSelect }, approvedBy: { select: empSelect } },
    orderBy: { effectiveDate: "desc" },
  });
  return successResponse(res, 200, "Promotions fetched", promotions);
});

export const createPromotion = asyncHandler(async (req, res) => {
  if (!req.body.employeeId || !req.body.effectiveDate) throw new AppError("employeeId and effectiveDate are required", 400);
  const promotion = await prisma.promotion.create({
    data: {
      employeeId: req.body.employeeId,
      fromDesignation: clean(req.body.fromDesignation),
      toDesignation: clean(req.body.toDesignation),
      fromSalary: req.body.fromSalary || null,
      toSalary: req.body.toSalary || null,
      effectiveDate: new Date(req.body.effectiveDate),
      reason: clean(req.body.reason),
      approvedById: clean(req.body.approvedById),
    },
    include: { employee: { select: empSelect }, approvedBy: { select: empSelect } },
  });
  return successResponse(res, 201, "Promotion created", promotion);
});

export const deletePromotion = asyncHandler(async (req, res) => {
  await prisma.promotion.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Promotion deleted");
});

/* ─── Warnings ─── */
export const listWarnings = asyncHandler(async (req, res) => {
  const where: Prisma.WarningWhereInput = {};
  if (req.query.employeeId) where.employeeId = String(req.query.employeeId);
  const warnings = await prisma.warning.findMany({
    where,
    include: { employee: { select: empSelect }, issuedBy: { select: empSelect } },
    orderBy: { issuedDate: "desc" },
  });
  return successResponse(res, 200, "Warnings fetched", warnings);
});

export const createWarning = asyncHandler(async (req, res) => {
  if (!req.body.employeeId || !req.body.title || !req.body.issuedDate) throw new AppError("employeeId, title, and issuedDate are required", 400);
  const warning = await prisma.warning.create({
    data: {
      employeeId: req.body.employeeId,
      type: enumValue(WarningType, req.body.type, WarningType.VERBAL),
      title: clean(req.body.title)!,
      description: clean(req.body.description),
      issuedById: clean(req.body.issuedById),
      issuedDate: new Date(req.body.issuedDate),
      expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
      notes: clean(req.body.notes),
    },
    include: { employee: { select: empSelect }, issuedBy: { select: empSelect } },
  });
  return successResponse(res, 201, "Warning created", warning);
});

export const updateWarning = asyncHandler(async (req, res) => {
  const data: Prisma.WarningUpdateInput = {};
  if (req.body.status) data.status = enumValue(WarningStatus, req.body.status, WarningStatus.ACTIVE);
  if (req.body.status === "RESOLVED") data.resolvedAt = new Date();
  if (req.body.notes !== undefined) data.notes = clean(req.body.notes) || undefined;
  const warning = await prisma.warning.update({ where: { id: req.params.id }, data, include: { employee: { select: empSelect }, issuedBy: { select: empSelect } } });
  return successResponse(res, 200, "Warning updated", warning);
});

export const deleteWarning = asyncHandler(async (req, res) => {
  await prisma.warning.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Warning deleted");
});

/* ─── HR Notes ─── */
export const listHrNotes = asyncHandler(async (req, res) => {
  if (!req.query.employeeId) throw new AppError("employeeId is required", 400);
  const notes = await prisma.hrNote.findMany({
    where: { employeeId: String(req.query.employeeId) },
    include: { createdBy: { select: empSelect } },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "HR notes fetched", notes);
});

export const createHrNote = asyncHandler(async (req, res) => {
  const user = (req as AuthRequest).user;
  const employee = await prisma.employee.findUnique({ where: { userId: user?.id } });
  if (!req.body.employeeId || !req.body.note) throw new AppError("employeeId and note are required", 400);
  const note = await prisma.hrNote.create({
    data: {
      employeeId: req.body.employeeId,
      note: clean(req.body.note)!,
      createdById: employee?.id,
      isPrivate: req.body.isPrivate ?? false,
    },
    include: { createdBy: { select: empSelect } },
  });
  return successResponse(res, 201, "HR note created", note);
});
