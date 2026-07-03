-- CreateEnum
CREATE TYPE "JobOpeningStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "ApplicantStatus" AS ENUM ('APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEWED', 'REJECTED', 'HIRED', 'WITHDREW');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('TELEPHONIC', 'VIDEO', 'FACE_TO_FACE', 'TECHNICAL', 'HR', 'PANEL');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "InterviewRecommendation" AS ENUM ('STRONG_HIRE', 'HIRE', 'ON_HOLD', 'REJECT', 'NEXT_ROUND');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "job_openings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "departmentId" TEXT,
    "location" TEXT,
    "jobType" "JobType" NOT NULL DEFAULT 'FULL_TIME',
    "experienceMin" INTEGER NOT NULL DEFAULT 0,
    "experienceMax" INTEGER NOT NULL DEFAULT 0,
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "description" TEXT,
    "requirements" TEXT,
    "openingsCount" INTEGER NOT NULL DEFAULT 1,
    "status" "JobOpeningStatus" NOT NULL DEFAULT 'DRAFT',
    "publishDate" TIMESTAMP(3),
    "closingDate" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_openings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicants" (
    "id" TEXT NOT NULL,
    "jobOpeningId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "resumeUrl" TEXT,
    "coverLetter" TEXT,
    "status" "ApplicantStatus" NOT NULL DEFAULT 'APPLIED',
    "source" TEXT,
    "currentCompany" TEXT,
    "currentDesignation" TEXT,
    "experienceYears" DOUBLE PRECISION,
    "noticePeriodDays" INTEGER,
    "expectedSalary" DOUBLE PRECISION,
    "currentSalary" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "interviewType" "InterviewType" NOT NULL DEFAULT 'VIDEO',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMins" INTEGER NOT NULL DEFAULT 60,
    "status" "InterviewStatus" NOT NULL DEFAULT 'SCHEDULED',
    "meetingLink" TEXT,
    "location" TEXT,
    "interviewerName" TEXT,
    "notes" TEXT,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_feedback" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 3,
    "strengths" TEXT,
    "weaknesses" TEXT,
    "technicalSkills" INTEGER,
    "communicationSkills" INTEGER,
    "overallAssessment" TEXT,
    "recommendation" "InterviewRecommendation" NOT NULL DEFAULT 'ON_HOLD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interview_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_letters" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "offerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joiningDate" TIMESTAMP(3),
    "designation" TEXT,
    "departmentId" TEXT,
    "ctc" DOUBLE PRECISION,
    "basicSalary" DOUBLE PRECISION,
    "hra" DOUBLE PRECISION,
    "otherAllowances" DOUBLE PRECISION,
    "status" "OfferStatus" NOT NULL DEFAULT 'DRAFT',
    "documentUrl" TEXT,
    "notes" TEXT,
    "sentAt" TIMESTAMP(3),
    "respondedAt" TIMESTAMP(3),
    "responseNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offer_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "job_openings_status_idx" ON "job_openings"("status");
CREATE INDEX "job_openings_departmentId_idx" ON "job_openings"("departmentId");
CREATE INDEX "job_openings_jobType_idx" ON "job_openings"("jobType");
CREATE INDEX "applicants_status_idx" ON "applicants"("status");
CREATE INDEX "applicants_jobOpeningId_idx" ON "applicants"("jobOpeningId");
CREATE INDEX "applicants_email_idx" ON "applicants"("email");
CREATE INDEX "interviews_applicantId_idx" ON "interviews"("applicantId");
CREATE INDEX "interviews_status_idx" ON "interviews"("status");
CREATE INDEX "interviews_scheduledAt_idx" ON "interviews"("scheduledAt");
CREATE INDEX "interview_feedback_interviewId_idx" ON "interview_feedback"("interviewId");
CREATE INDEX "offer_letters_applicantId_idx" ON "offer_letters"("applicantId");
CREATE INDEX "offer_letters_status_idx" ON "offer_letters"("status");

-- AddForeignKey
ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_jobOpeningId_fkey" FOREIGN KEY ("jobOpeningId") REFERENCES "job_openings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "interview_feedback" ADD CONSTRAINT "interview_feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
