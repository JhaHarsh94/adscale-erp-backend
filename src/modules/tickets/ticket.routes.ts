import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  categoriesCreate,
  categoriesDelete,
  categoriesList,
  categoriesUpdate,
  ticketCommentsCreate,
  ticketCommentsList,
  ticketsAssign,
  ticketsChangeStatus,
  ticketsCreate,
  ticketsDashboard,
  ticketsGetOne,
  ticketsList,
  ticketsSlaEvent,
  ticketsUpdate,
} from "./ticket.controller";

const router = Router();

const ticketReadRoles = ["CEO", "DIRECTOR", "OPERATIONS_MANAGER", "TEAM_LEAD", "HR", "EMPLOYEE", "SALES_MANAGER", "SUPER_ADMIN"];
const ticketWriteRoles = ["CEO", "DIRECTOR", "OPERATIONS_MANAGER", "TEAM_LEAD", "SALES_MANAGER", "SUPER_ADMIN"];
const ticketAdminRoles = ["CEO", "DIRECTOR", "OPERATIONS_MANAGER", "SUPER_ADMIN"];

/* Categories */
router.get("/categories", protect, allowRoles(...ticketReadRoles), categoriesList);
router.post("/categories", protect, allowRoles(...ticketAdminRoles), categoriesCreate);
router.put("/categories/:id", protect, allowRoles(...ticketAdminRoles), categoriesUpdate);
router.delete("/categories/:id", protect, allowRoles(...ticketAdminRoles), categoriesDelete);

/* Dashboard */
router.get("/dashboard", protect, allowRoles(...ticketReadRoles), ticketsDashboard);

/* Tickets */
router.get("/", protect, allowRoles(...ticketReadRoles), ticketsList);
router.post("/", protect, allowRoles(...ticketWriteRoles), ticketsCreate);
router.get("/:id", protect, allowRoles(...ticketReadRoles), ticketsGetOne);
router.put("/:id", protect, allowRoles(...ticketWriteRoles), ticketsUpdate);
router.post("/:id/status", protect, allowRoles(...ticketWriteRoles), ticketsChangeStatus);
router.post("/:id/assign", protect, allowRoles(...ticketWriteRoles), ticketsAssign);

/* Comments */
router.get("/:id/comments", protect, allowRoles(...ticketReadRoles), ticketCommentsList);
router.post("/:id/comments", protect, allowRoles(...ticketWriteRoles), ticketCommentsCreate);

/* SLA */
router.post("/:id/sla", protect, allowRoles(...ticketAdminRoles), ticketsSlaEvent);

export default router;
