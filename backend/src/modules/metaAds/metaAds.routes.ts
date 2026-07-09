import { Router } from "express";
import { protect, allowRoles } from "../../middlewares/auth.middleware";
import {
  createAccount, createAd, createAdSet, createCampaign, createReport,
  deleteAccount, deleteAd, deleteAdSet, deleteCampaign, deleteMetric, deleteReport,
  getAccount, getAd, getAdSet, getCampaign, getDashboard,
  getProjectsWithoutAds, listAccounts, listAds, listAdSets, listCampaigns,
  listMetrics, listReports, updateAccount, updateAd, updateAdSet, updateCampaign, upsertMetric,
} from "./metaAds.controller";

const router = Router();

const roles = ["SUPER_ADMIN", "DIRECTOR", "OPERATIONS_MANAGER", "SALES_MANAGER", "TEAM_LEAD", "EMPLOYEE"];

router.use(protect);
router.use(allowRoles(...roles));

router.get("/dashboard", getDashboard);

router.get("/accounts", listAccounts);
router.get("/accounts/without-ads", getProjectsWithoutAds);
router.get("/accounts/:id", getAccount);
router.post("/accounts", createAccount);
router.put("/accounts/:id", updateAccount);
router.delete("/accounts/:id", deleteAccount);

router.get("/campaigns", listCampaigns);
router.get("/campaigns/:id", getCampaign);
router.post("/campaigns", createCampaign);
router.put("/campaigns/:id", updateCampaign);
router.delete("/campaigns/:id", deleteCampaign);

router.get("/adsets", listAdSets);
router.get("/adsets/:id", getAdSet);
router.post("/adsets", createAdSet);
router.put("/adsets/:id", updateAdSet);
router.delete("/adsets/:id", deleteAdSet);

router.get("/ads", listAds);
router.get("/ads/:id", getAd);
router.post("/ads", createAd);
router.put("/ads/:id", updateAd);
router.delete("/ads/:id", deleteAd);

router.get("/metrics", listMetrics);
router.post("/metrics", upsertMetric);
router.delete("/metrics/:id", deleteMetric);

router.get("/reports", listReports);
router.post("/reports", createReport);
router.delete("/reports/:id", deleteReport);

export default router;