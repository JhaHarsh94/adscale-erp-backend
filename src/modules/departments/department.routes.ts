import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "./department.controller";

const router = Router();

router.get("/", protect, getDepartments);
router.get("/:id", protect, getDepartmentById);

router.post(
  "/",
  protect,
  allowRoles("CEO", "DIRECTOR"),
  createDepartment
);

router.put(
  "/:id",
  protect,
  allowRoles("CEO", "DIRECTOR"),
  updateDepartment
);

router.delete("/:id", protect, allowRoles("CEO"), deleteDepartment);

export default router;