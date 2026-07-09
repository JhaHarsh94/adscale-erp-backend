import { Router } from "express";
import { protect, allowRoles } from "../../middlewares/auth.middleware";
import {
  getCeoDashboard,
  getRevenueAnalytics,
  getEmployeeAnalytics,
  getProjectAnalytics,
  getTicketAnalytics,
  getAttendanceAnalytics,
  getLeadAnalytics,
  getProductivityAnalytics,
  getDepartmentPerformance,
  getClientSatisfaction,
  listSnapshots,
  createSnapshot,
  listKpis,
  createKpi,
  updateKpi,
  deleteKpi,
  listWidgets,
  createWidget,
  updateWidget,
  deleteWidget,
  listReportExports,
  createReportExport,
} from "./analytics.controller";

const router = Router();

const roles = ["SUPER_ADMIN", "DIRECTOR", "OPERATIONS_MANAGER", "SALES_MANAGER", "HR"];

router.use(protect);
router.use(allowRoles(...roles));

router.get("/ceo-dashboard", getCeoDashboard);
router.get("/revenue", getRevenueAnalytics);
router.get("/employees", getEmployeeAnalytics);
router.get("/projects", getProjectAnalytics);
router.get("/tickets", getTicketAnalytics);
router.get("/attendance", getAttendanceAnalytics);
router.get("/leads", getLeadAnalytics);
router.get("/productivity", getProductivityAnalytics);
router.get("/departments", getDepartmentPerformance);
router.get("/client-satisfaction", getClientSatisfaction);

router.get("/snapshots", listSnapshots);
router.post("/snapshots", createSnapshot);

router.get("/kpis", listKpis);
router.post("/kpis", createKpi);
router.put("/kpis/:id", updateKpi);
router.delete("/kpis/:id", deleteKpi);

router.get("/widgets", listWidgets);
router.post("/widgets", createWidget);
router.put("/widgets/:id", updateWidget);
router.delete("/widgets/:id", deleteWidget);

router.get("/reports", listReportExports);
router.post("/reports", createReportExport);

export default router;
