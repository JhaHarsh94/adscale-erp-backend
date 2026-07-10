import {
  JobOpeningStatus,
  ApplicantStatus,
  InterviewStatus,
  InterviewType,
  InterviewRecommendation,
  OfferStatus,
  JobType,
  type Prisma,
} from "@prisma/client";
import { Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";
import type { AuthRequest } from "../../middlewares/auth.middleware";

const clean = (value: unknown) => {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str || null;
};

const enumValue = <T extends Record<string, string>>(values: T, value: unknown, fallback: T[keyof T]) =>
  Object.values(values).includes(String(value)) ? String(value) as T[keyof T] : fallback;

const userSelect = { id: true, name: true, email: true };
const deptSelect = { id: true, name: true };

/* ─── Dashboard ─── */
export const dashboard = asyncHandler(async (req, res) => {
  const [totalJobs, totalApplicants, totalInterviews, totalOffers, statusCounts] = await Promise.all([
    prisma.jobOpening.count(),
    prisma.applicant.count(),
    prisma.interview.count(),
    prisma.offerLetter.count(),
    prisma.applicant.groupBy({ by: ["status"], _count: true }),
  ]);
  return successResponse(res, 200, "Recruitment dashboard", {
    totalJobs,
    totalApplicants,
    totalInterviews,
    totalOffers,
    applicantsByStatus: statusCounts,
  });
});

/* ─── Job Openings ─── */
export const listJobOpenings = asyncHandler(async (req, res) => {
  const where: Prisma.JobOpeningWhereInput = {};
  if (req.query.status) where.status = enumValue(JobOpeningStatus, req.query.status, JobOpeningStatus.OPEN);
  if (req.query.departmentId) where.departmentId = String(req.query.departmentId);
  const jobs = await prisma.jobOpening.findMany({
    where,
    include: {
      department: { select: deptSelect },
      createdBy: { select: userSelect },
      _count: { select: { applicants: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Job openings fetched", jobs);
});

export const getJobOpening = asyncHandler(async (req, res) => {
  const job = await prisma.jobOpening.findUnique({
    where: { id: req.params.id },
    include: {
      department: { select: deptSelect },
      createdBy: { select: userSelect },
      _count: { select: { applicants: true } },
    },
  });
  if (!job) throw new AppError("Job opening not found", 404);
  return successResponse(res, 200, "Job opening fetched", job);
});

export const createJobOpening = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new AppError("Title is required", 400);
  const job = await prisma.jobOpening.create({
    data: {
      title: req.body.title,
      departmentId: clean(req.body.departmentId),
      location: clean(req.body.location),
      jobType: enumValue(JobType, req.body.jobType, JobType.FULL_TIME),
      experienceMin: req.body.experienceMin ?? 0,
      experienceMax: req.body.experienceMax ?? 0,
      salaryMin: req.body.salaryMin ? parseFloat(req.body.salaryMin) : null,
      salaryMax: req.body.salaryMax ? parseFloat(req.body.salaryMax) : null,
      description: clean(req.body.description),
      requirements: clean(req.body.requirements),
      openingsCount: req.body.openingsCount ?? 1,
      status: enumValue(JobOpeningStatus, req.body.status, JobOpeningStatus.DRAFT),
      publishDate: req.body.publishDate ? new Date(req.body.publishDate) : null,
      closingDate: req.body.closingDate ? new Date(req.body.closingDate) : null,
      createdById: (req as AuthRequest).user?.id,
    },
    include: { department: { select: deptSelect }, createdBy: { select: userSelect } },
  });
  return successResponse(res, 201, "Job opening created", job);
});

export const updateJobOpening = asyncHandler(async (req, res) => {
  const data: Prisma.JobOpeningUpdateInput = {};
  if (req.body.title) data.title = req.body.title;
  if (req.body.departmentId !== undefined) data.department = clean(req.body.departmentId) ? { connect: { id: req.body.departmentId } } : { disconnect: true };
  if (req.body.location !== undefined) data.location = clean(req.body.location);
  if (req.body.jobType) data.jobType = enumValue(JobType, req.body.jobType, JobType.FULL_TIME);
  if (req.body.experienceMin !== undefined) data.experienceMin = req.body.experienceMin;
  if (req.body.experienceMax !== undefined) data.experienceMax = req.body.experienceMax;
  if (req.body.salaryMin !== undefined) data.salaryMin = req.body.salaryMin ? parseFloat(req.body.salaryMin) : null;
  if (req.body.salaryMax !== undefined) data.salaryMax = req.body.salaryMax ? parseFloat(req.body.salaryMax) : null;
  if (req.body.description !== undefined) data.description = clean(req.body.description);
  if (req.body.requirements !== undefined) data.requirements = clean(req.body.requirements);
  if (req.body.openingsCount !== undefined) data.openingsCount = req.body.openingsCount;
  if (req.body.status) data.status = enumValue(JobOpeningStatus, req.body.status, JobOpeningStatus.DRAFT);
  if (req.body.publishDate !== undefined) data.publishDate = req.body.publishDate ? new Date(req.body.publishDate) : null;
  if (req.body.closingDate !== undefined) data.closingDate = req.body.closingDate ? new Date(req.body.closingDate) : null;
  const job = await prisma.jobOpening.update({
    where: { id: req.params.id },
    data,
    include: { department: { select: deptSelect }, createdBy: { select: userSelect } },
  });
  return successResponse(res, 200, "Job opening updated", job);
});

export const deleteJobOpening = asyncHandler(async (req, res) => {
  await prisma.jobOpening.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Job opening deleted");
});

/* ─── Applicants ─── */
export const listApplicants = asyncHandler(async (req, res) => {
  const where: Prisma.ApplicantWhereInput = {};
  if (req.query.status) where.status = enumValue(ApplicantStatus, req.query.status, ApplicantStatus.APPLIED);
  if (req.query.jobOpeningId) where.jobOpeningId = String(req.query.jobOpeningId);
  const applicants = await prisma.applicant.findMany({
    where,
    include: {
      jobOpening: { select: { id: true, title: true } },
      _count: { select: { interviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Applicants fetched", applicants);
});

export const getApplicant = asyncHandler(async (req, res) => {
  const applicant = await prisma.applicant.findUnique({
    where: { id: req.params.id },
    include: {
      jobOpening: { select: { id: true, title: true } },
      interviews: {
        include: { feedback: true },
        orderBy: { scheduledAt: "desc" },
      },
    },
  });
  if (!applicant) throw new AppError("Applicant not found", 404);
  return successResponse(res, 200, "Applicant fetched", applicant);
});

export const createApplicant = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.email) throw new AppError("Name and email are required", 400);
  const applicant = await prisma.applicant.create({
    data: {
      jobOpeningId: clean(req.body.jobOpeningId),
      name: req.body.name,
      email: req.body.email,
      phone: clean(req.body.phone),
      resumeUrl: clean(req.body.resumeUrl),
      coverLetter: clean(req.body.coverLetter),
      status: enumValue(ApplicantStatus, req.body.status, ApplicantStatus.APPLIED),
      source: clean(req.body.source),
      currentCompany: clean(req.body.currentCompany),
      currentDesignation: clean(req.body.currentDesignation),
      experienceYears: req.body.experienceYears ? parseFloat(req.body.experienceYears) : null,
      noticePeriodDays: req.body.noticePeriodDays ? parseInt(req.body.noticePeriodDays) : null,
      expectedSalary: req.body.expectedSalary ? parseFloat(req.body.expectedSalary) : null,
      currentSalary: req.body.currentSalary ? parseFloat(req.body.currentSalary) : null,
      notes: clean(req.body.notes),
    },
    include: { jobOpening: { select: { id: true, title: true } } },
  });
  return successResponse(res, 201, "Applicant created", applicant);
});

export const updateApplicant = asyncHandler(async (req, res) => {
  const data: Prisma.ApplicantUpdateInput = {};
  if (req.body.name) data.name = req.body.name;
  if (req.body.email) data.email = req.body.email;
  if (req.body.phone !== undefined) data.phone = clean(req.body.phone);
  if (req.body.resumeUrl !== undefined) data.resumeUrl = clean(req.body.resumeUrl);
  if (req.body.coverLetter !== undefined) data.coverLetter = clean(req.body.coverLetter);
  if (req.body.status) data.status = enumValue(ApplicantStatus, req.body.status, ApplicantStatus.APPLIED);
  if (req.body.source !== undefined) data.source = clean(req.body.source);
  if (req.body.currentCompany !== undefined) data.currentCompany = clean(req.body.currentCompany);
  if (req.body.currentDesignation !== undefined) data.currentDesignation = clean(req.body.currentDesignation);
  if (req.body.experienceYears !== undefined) data.experienceYears = req.body.experienceYears ? parseFloat(req.body.experienceYears) : null;
  if (req.body.noticePeriodDays !== undefined) data.noticePeriodDays = req.body.noticePeriodDays ? parseInt(req.body.noticePeriodDays) : null;
  if (req.body.expectedSalary !== undefined) data.expectedSalary = req.body.expectedSalary ? parseFloat(req.body.expectedSalary) : null;
  if (req.body.currentSalary !== undefined) data.currentSalary = req.body.currentSalary ? parseFloat(req.body.currentSalary) : null;
  if (req.body.notes !== undefined) data.notes = clean(req.body.notes);
  if (req.body.jobOpeningId !== undefined) data.jobOpening = clean(req.body.jobOpeningId) ? { connect: { id: req.body.jobOpeningId } } : { disconnect: true };
  const applicant = await prisma.applicant.update({
    where: { id: req.params.id },
    data,
    include: { jobOpening: { select: { id: true, title: true } } },
  });
  return successResponse(res, 200, "Applicant updated", applicant);
});

export const deleteApplicant = asyncHandler(async (req, res) => {
  await prisma.applicant.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Applicant deleted");
});

/* ─── Interviews ─── */
export const listInterviews = asyncHandler(async (req, res) => {
  const where: Prisma.InterviewWhereInput = {};
  if (req.query.applicantId) where.applicantId = String(req.query.applicantId);
  if (req.query.status) where.status = enumValue(InterviewStatus, req.query.status, InterviewStatus.SCHEDULED);
  const interviews = await prisma.interview.findMany({
    where,
    include: {
      applicant: { select: { id: true, name: true, email: true } },
      feedback: true,
    },
    orderBy: { scheduledAt: "desc" },
  });
  return successResponse(res, 200, "Interviews fetched", interviews);
});

export const getInterview = asyncHandler(async (req, res) => {
  const interview = await prisma.interview.findUnique({
    where: { id: req.params.id },
    include: { applicant: { select: { id: true, name: true, email: true, phone: true } }, feedback: true },
  });
  if (!interview) throw new AppError("Interview not found", 404);
  return successResponse(res, 200, "Interview fetched", interview);
});

export const createInterview = asyncHandler(async (req, res) => {
  if (!req.body.applicantId || !req.body.scheduledAt) throw new AppError("applicantId and scheduledAt are required", 400);
  const interview = await prisma.interview.create({
    data: {
      applicantId: req.body.applicantId,
      interviewType: enumValue(InterviewType, req.body.interviewType, InterviewType.VIDEO),
      scheduledAt: new Date(req.body.scheduledAt),
      durationMins: req.body.durationMins ?? 60,
      status: enumValue(InterviewStatus, req.body.status, InterviewStatus.SCHEDULED),
      meetingLink: clean(req.body.meetingLink),
      location: clean(req.body.location),
      interviewerName: clean(req.body.interviewerName),
      notes: clean(req.body.notes),
      roundNumber: req.body.roundNumber ?? 1,
    },
    include: { applicant: { select: { id: true, name: true, email: true } } },
  });
  return successResponse(res, 201, "Interview created", interview);
});

export const updateInterview = asyncHandler(async (req, res) => {
  const data: Prisma.InterviewUpdateInput = {};
  if (req.body.interviewType) data.interviewType = enumValue(InterviewType, req.body.interviewType, InterviewType.VIDEO);
  if (req.body.scheduledAt) data.scheduledAt = new Date(req.body.scheduledAt);
  if (req.body.durationMins !== undefined) data.durationMins = req.body.durationMins;
  if (req.body.status) data.status = enumValue(InterviewStatus, req.body.status, InterviewStatus.SCHEDULED);
  if (req.body.meetingLink !== undefined) data.meetingLink = clean(req.body.meetingLink);
  if (req.body.location !== undefined) data.location = clean(req.body.location);
  if (req.body.interviewerName !== undefined) data.interviewerName = clean(req.body.interviewerName);
  if (req.body.notes !== undefined) data.notes = clean(req.body.notes);
  if (req.body.roundNumber !== undefined) data.roundNumber = req.body.roundNumber;
  const interview = await prisma.interview.update({
    where: { id: req.params.id },
    data,
    include: { applicant: { select: { id: true, name: true, email: true } } },
  });
  return successResponse(res, 200, "Interview updated", interview);
});

export const deleteInterview = asyncHandler(async (req, res) => {
  await prisma.interview.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Interview deleted");
});

/* ─── Interview Feedback ─── */
export const listFeedback = asyncHandler(async (req, res) => {
  const where: Prisma.InterviewFeedbackWhereInput = {};
  if (req.query.interviewId) where.interviewId = String(req.query.interviewId);
  const feedback = await prisma.interviewFeedback.findMany({ where, orderBy: { createdAt: "desc" } });
  return successResponse(res, 200, "Feedback fetched", feedback);
});

export const createFeedback = asyncHandler(async (req, res) => {
  if (!req.body.interviewId || !req.body.reviewerName) throw new AppError("interviewId and reviewerName are required", 400);
  const fb = await prisma.interviewFeedback.create({
    data: {
      interviewId: req.body.interviewId,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating ?? 3,
      strengths: clean(req.body.strengths),
      weaknesses: clean(req.body.weaknesses),
      technicalSkills: req.body.technicalSkills ? parseInt(req.body.technicalSkills) : null,
      communicationSkills: req.body.communicationSkills ? parseInt(req.body.communicationSkills) : null,
      overallAssessment: clean(req.body.overallAssessment),
      recommendation: enumValue(InterviewRecommendation, req.body.recommendation, InterviewRecommendation.ON_HOLD),
    },
  });
  return successResponse(res, 201, "Feedback created", fb);
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  await prisma.interviewFeedback.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Feedback deleted");
});

/* ─── Offer Letters ─── */
export const listOfferLetters = asyncHandler(async (req, res) => {
  const where: Prisma.OfferLetterWhereInput = {};
  if (req.query.status) where.status = enumValue(OfferStatus, req.query.status, OfferStatus.DRAFT);
  const offers = await prisma.offerLetter.findMany({
    where,
    include: {
      applicant: { select: { id: true, name: true, email: true } },
      department: { select: deptSelect },
    },
    orderBy: { createdAt: "desc" },
  });
  return successResponse(res, 200, "Offer letters fetched", offers);
});

export const getOfferLetter = asyncHandler(async (req, res) => {
  const offer = await prisma.offerLetter.findUnique({
    where: { id: req.params.id },
    include: { applicant: { select: { id: true, name: true, email: true, phone: true } }, department: { select: deptSelect } },
  });
  if (!offer) throw new AppError("Offer letter not found", 404);
  return successResponse(res, 200, "Offer letter fetched", offer);
});

export const createOfferLetter = asyncHandler(async (req, res) => {
  if (!req.body.applicantId) throw new AppError("applicantId is required", 400);
  const offer = await prisma.offerLetter.create({
    data: {
      applicantId: req.body.applicantId,
      offerDate: req.body.offerDate ? new Date(req.body.offerDate) : new Date(),
      joiningDate: req.body.joiningDate ? new Date(req.body.joiningDate) : null,
      designation: clean(req.body.designation),
      departmentId: clean(req.body.departmentId),
      ctc: req.body.ctc ? parseFloat(req.body.ctc) : null,
      basicSalary: req.body.basicSalary ? parseFloat(req.body.basicSalary) : null,
      hra: req.body.hra ? parseFloat(req.body.hra) : null,
      otherAllowances: req.body.otherAllowances ? parseFloat(req.body.otherAllowances) : null,
      status: enumValue(OfferStatus, req.body.status, OfferStatus.DRAFT),
      documentUrl: clean(req.body.documentUrl),
      notes: clean(req.body.notes),
    },
    include: { applicant: { select: { id: true, name: true, email: true } }, department: { select: deptSelect } },
  });
  return successResponse(res, 201, "Offer letter created", offer);
});

export const updateOfferLetter = asyncHandler(async (req, res) => {
  const data: Prisma.OfferLetterUpdateInput = {};
  if (req.body.offerDate) data.offerDate = new Date(req.body.offerDate);
  if (req.body.joiningDate !== undefined) data.joiningDate = req.body.joiningDate ? new Date(req.body.joiningDate) : null;
  if (req.body.designation !== undefined) data.designation = clean(req.body.designation);
  if (req.body.departmentId !== undefined) data.department = clean(req.body.departmentId) ? { connect: { id: req.body.departmentId } } : { disconnect: true };
  if (req.body.ctc !== undefined) data.ctc = req.body.ctc ? parseFloat(req.body.ctc) : null;
  if (req.body.basicSalary !== undefined) data.basicSalary = req.body.basicSalary ? parseFloat(req.body.basicSalary) : null;
  if (req.body.hra !== undefined) data.hra = req.body.hra ? parseFloat(req.body.hra) : null;
  if (req.body.otherAllowances !== undefined) data.otherAllowances = req.body.otherAllowances ? parseFloat(req.body.otherAllowances) : null;
  if (req.body.status) data.status = enumValue(OfferStatus, req.body.status, OfferStatus.DRAFT);
  if (req.body.documentUrl !== undefined) data.documentUrl = clean(req.body.documentUrl);
  if (req.body.notes !== undefined) data.notes = clean(req.body.notes);
  if (req.body.sentAt !== undefined) data.sentAt = req.body.sentAt ? new Date(req.body.sentAt) : null;
  if (req.body.respondedAt !== undefined) data.respondedAt = req.body.respondedAt ? new Date(req.body.respondedAt) : null;
  if (req.body.responseNotes !== undefined) data.responseNotes = clean(req.body.responseNotes);
  const offer = await prisma.offerLetter.update({
    where: { id: req.params.id },
    data,
    include: { applicant: { select: { id: true, name: true, email: true } }, department: { select: deptSelect } },
  });
  return successResponse(res, 200, "Offer letter updated", offer);
});

export const deleteOfferLetter = asyncHandler(async (req, res) => {
  await prisma.offerLetter.delete({ where: { id: req.params.id } });
  return successResponse(res, 200, "Offer letter deleted");
});
