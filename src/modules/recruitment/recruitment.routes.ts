import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  dashboard,
  listJobOpenings, getJobOpening, createJobOpening, updateJobOpening, deleteJobOpening,
  listApplicants, getApplicant, createApplicant, updateApplicant, deleteApplicant,
  listInterviews, getInterview, createInterview, updateInterview, deleteInterview,
  listFeedback, createFeedback, deleteFeedback,
  listOfferLetters, getOfferLetter, createOfferLetter, updateOfferLetter, deleteOfferLetter,
} from "./recruitment.controller";

const router = Router();

const adminRoles = ["CEO", "DIRECTOR", "HR"];
const readRoles = ["CEO", "DIRECTOR", "HR", "OPERATIONS_MANAGER"];

router.get("/dashboard", protect, allowRoles(...readRoles), dashboard);

/* Job Openings */
router.get("/job-openings", protect, allowRoles(...readRoles), listJobOpenings);
router.get("/job-openings/:id", protect, allowRoles(...readRoles), getJobOpening);
router.post("/job-openings", protect, allowRoles(...adminRoles), createJobOpening);
router.put("/job-openings/:id", protect, allowRoles(...adminRoles), updateJobOpening);
router.delete("/job-openings/:id", protect, allowRoles(...adminRoles), deleteJobOpening);

/* Applicants */
router.get("/applicants", protect, allowRoles(...readRoles), listApplicants);
router.get("/applicants/:id", protect, allowRoles(...readRoles), getApplicant);
router.post("/applicants", protect, allowRoles(...adminRoles), createApplicant);
router.put("/applicants/:id", protect, allowRoles(...adminRoles), updateApplicant);
router.delete("/applicants/:id", protect, allowRoles(...adminRoles), deleteApplicant);

/* Interviews */
router.get("/interviews", protect, allowRoles(...readRoles), listInterviews);
router.get("/interviews/:id", protect, allowRoles(...readRoles), getInterview);
router.post("/interviews", protect, allowRoles(...adminRoles), createInterview);
router.put("/interviews/:id", protect, allowRoles(...adminRoles), updateInterview);
router.delete("/interviews/:id", protect, allowRoles(...adminRoles), deleteInterview);

/* Interview Feedback */
router.get("/feedback", protect, allowRoles(...readRoles), listFeedback);
router.post("/feedback", protect, allowRoles(...adminRoles), createFeedback);
router.delete("/feedback/:id", protect, allowRoles(...adminRoles), deleteFeedback);

/* Offer Letters */
router.get("/offer-letters", protect, allowRoles(...readRoles), listOfferLetters);
router.get("/offer-letters/:id", protect, allowRoles(...readRoles), getOfferLetter);
router.post("/offer-letters", protect, allowRoles(...adminRoles), createOfferLetter);
router.put("/offer-letters/:id", protect, allowRoles(...adminRoles), updateOfferLetter);
router.delete("/offer-letters/:id", protect, allowRoles(...adminRoles), deleteOfferLetter);

export default router;
