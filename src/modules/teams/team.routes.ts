import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  addTeamMember,
  createTeam,
  deleteTeam,
  getTeamById,
  getTeamMembers,
  getTeams,
  removeTeamMember,
  updateTeam,
  updateTeamMemberRole,
} from "./team.controller";

const router = Router();

router.get("/", protect, getTeams);
router.get("/:id", protect, getTeamById);

router.post(
  "/",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"),
  createTeam
);

router.put(
  "/:id",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"),
  updateTeam
);

router.delete(
  "/:id",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER"),
  deleteTeam
);

router.get("/:id/members", protect, getTeamMembers);

router.post(
  "/:id/members",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"),
  addTeamMember
);

router.put(
  "/:id/members/:employeeId",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"),
  updateTeamMemberRole
);

router.delete(
  "/:id/members/:employeeId",
  protect,
  allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"),
  removeTeamMember
);

export default router;