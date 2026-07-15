import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  createComponent, createPayroll, dashboard, deleteComponent, deletePayroll, deleteStructure,
  getPayroll, listComponents, listPayrolls, listStructures, processPayroll, updateComponent, upsertStructure,
  approvePayroll, cancelPayroll, generatePayslipPdf,
  listBonuses, createBonus, updateBonus, deleteBonus,
} from "./payroll.controller";

const router = Router();

const adminRoles = ["CEO", "DIRECTOR", "HR"];
const readRoles = ["CEO", "DIRECTOR", "HR", "OPERATIONS_MANAGER"];

router.get("/dashboard", protect, allowRoles(...readRoles), dashboard);

router.get("/components", protect, allowRoles(...readRoles), listComponents);
router.post("/components", protect, allowRoles(...adminRoles), createComponent);
router.put("/components/:id", protect, allowRoles(...adminRoles), updateComponent);
router.delete("/components/:id", protect, allowRoles(...adminRoles), deleteComponent);

router.get("/structures", protect, allowRoles(...adminRoles), listStructures);
router.post("/structures", protect, allowRoles(...adminRoles), upsertStructure);
router.delete("/structures/:id", protect, allowRoles(...adminRoles), deleteStructure);

router.get("/payrolls", protect, allowRoles(...readRoles), listPayrolls);
router.get("/payrolls/:id", protect, allowRoles(...readRoles), getPayroll);
router.post("/payrolls", protect, allowRoles(...adminRoles), createPayroll);
router.put("/payrolls/:id/process", protect, allowRoles(...adminRoles), processPayroll);
router.put("/payrolls/:id/approve", protect, allowRoles(...adminRoles), approvePayroll);
router.put("/payrolls/:id/cancel", protect, allowRoles(...adminRoles), cancelPayroll);
router.delete("/payrolls/:id", protect, allowRoles(...adminRoles), deletePayroll);

router.get("/bonuses", protect, allowRoles(...readRoles), listBonuses);
router.post("/bonuses", protect, allowRoles(...adminRoles), createBonus);
router.put("/bonuses/:id", protect, allowRoles(...adminRoles), updateBonus);
router.delete("/bonuses/:id", protect, allowRoles(...adminRoles), deleteBonus);

router.get("/payslips/:id/pdf", protect, allowRoles(...readRoles), generatePayslipPdf);

export default router;
