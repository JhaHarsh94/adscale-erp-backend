import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  clientDashboard,
  directorDashboard,
  employeeDashboard,
  hrDashboard,
  operationsDashboard,
  ceoDashboard,
  teamLeadDashboard,
} from "./dashboard.controller";

const router = Router();

router.get(
  "/ceo",
  protect,
  allowRoles("CEO"),
  ceoDashboard
);

router.get(
  "/director",
  protect,
  allowRoles("CEO", "DIRECTOR"),
  directorDashboard
);

router.get(
  "/hr",
  protect,
  allowRoles("CEO", "DIRECTOR", "HR"),
  hrDashboard
);

router.get(
  "/operations",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER"),
  operationsDashboard
);

router.get(
  "/team-lead",
  protect,
  allowRoles("CEO", "OPERATIONS_MANAGER", "TEAM_LEAD"),
  teamLeadDashboard
);

router.get(
  "/employee",
  protect,
  allowRoles("CEO", "OPERATIONS_MANAGER", "TEAM_LEAD", "EMPLOYEE"),
  employeeDashboard
);

router.get(
  "/client",
  protect,
  allowRoles("CEO", "CLIENT"),
  clientDashboard
);

export default router;