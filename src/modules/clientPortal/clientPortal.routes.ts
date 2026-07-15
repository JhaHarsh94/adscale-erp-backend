import { Router } from "express";
import { protect, allowRoles } from "../../middlewares/auth.middleware";
import { clientProtect } from "../../middlewares/clientAuth.middleware";
import {
  addTicketComment,
  adminCreateClientUser,
  adminListClientUsers,
  approveClientApproval,
  clientLogin,
  createClientTicket,
  getClientApprovals,
  getClientDashboard,
  getClientFiles,
  getClientMeetings,
  getClientNotifications,
  getClientProfile,
  getClientProjectById,
  getClientProjects,
  getClientTicketById,
  getClientTickets,
  markAllNotificationsRead,
  markNotificationRead,
  rejectClientApproval,
} from "./clientPortal.controller";

const router = Router();

router.post("/auth/login", clientLogin);
router.get("/auth/me", clientProtect, getClientProfile);

router.get("/dashboard", clientProtect, getClientDashboard);

router.get("/projects", clientProtect, getClientProjects);
router.get("/projects/:id", clientProtect, getClientProjectById);

router.get("/tickets", clientProtect, getClientTickets);
router.post("/tickets", clientProtect, createClientTicket);
router.get("/tickets/:id", clientProtect, getClientTicketById);
router.post("/tickets/:id/comments", clientProtect, addTicketComment);

router.get("/files", clientProtect, getClientFiles);

router.get("/approvals", clientProtect, getClientApprovals);
router.put("/approvals/:id/approve", clientProtect, approveClientApproval);
router.put("/approvals/:id/reject", clientProtect, rejectClientApproval);

router.get("/meetings", clientProtect, getClientMeetings);

router.get("/notifications", clientProtect, getClientNotifications);
router.put("/notifications/:id/read", clientProtect, markNotificationRead);
router.put("/notifications/read-all", clientProtect, markAllNotificationsRead);

const adminRoles = ["CEO", "DIRECTOR", "SALES_MANAGER", "OPERATIONS_MANAGER"];
router.post("/admin/create", protect, allowRoles(...adminRoles), adminCreateClientUser);
router.get("/admin/users", protect, allowRoles(...adminRoles), adminListClientUsers);

export default router;
