import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  createAppraisal, createHrNote, createPromotion, createReview, createWarning, dashboard,
  deleteAppraisal, deletePromotion, deleteReview, deleteWarning, listAppraisals, listHrNotes,
  listPromotions, listReviews, listWarnings, getReview, updateAppraisal, updateReview, updateWarning,
  updatePromotion, getEmployeeLifecycle,
} from "./hrms.controller";

const router = Router();

const adminRoles = ["SUPER_ADMIN", "DIRECTOR", "HR"];
const readRoles = ["SUPER_ADMIN", "DIRECTOR", "HR", "OPERATIONS_MANAGER"];

router.get("/dashboard", protect, allowRoles(...readRoles), dashboard);

router.get("/reviews", protect, allowRoles(...readRoles), listReviews);
router.get("/reviews/:id", protect, allowRoles(...readRoles), getReview);
router.post("/reviews", protect, allowRoles(...adminRoles), createReview);
router.put("/reviews/:id", protect, allowRoles(...adminRoles), updateReview);
router.delete("/reviews/:id", protect, allowRoles(...adminRoles), deleteReview);

router.get("/appraisals", protect, allowRoles(...readRoles), listAppraisals);
router.post("/appraisals", protect, allowRoles(...adminRoles), createAppraisal);
router.put("/appraisals/:id", protect, allowRoles(...adminRoles), updateAppraisal);
router.delete("/appraisals/:id", protect, allowRoles(...adminRoles), deleteAppraisal);

router.get("/promotions", protect, allowRoles(...readRoles), listPromotions);
router.post("/promotions", protect, allowRoles(...adminRoles), createPromotion);
router.put("/promotions/:id", protect, allowRoles(...adminRoles), updatePromotion);
router.delete("/promotions/:id", protect, allowRoles(...adminRoles), deletePromotion);

router.get("/warnings", protect, allowRoles(...readRoles), listWarnings);
router.post("/warnings", protect, allowRoles(...adminRoles), createWarning);
router.put("/warnings/:id", protect, allowRoles(...adminRoles), updateWarning);
router.delete("/warnings/:id", protect, allowRoles(...adminRoles), deleteWarning);

router.get("/hr-notes", protect, allowRoles(...readRoles), listHrNotes);
router.post("/hr-notes", protect, allowRoles(...adminRoles), createHrNote);

router.get("/employees/:id/lifecycle", protect, allowRoles(...readRoles), getEmployeeLifecycle);

export default router;
