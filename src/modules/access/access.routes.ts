import { Router } from "express";
import { allowRoles, protect } from "../../middlewares/auth.middleware";
import {
  createPermission,
  createRole,
  deletePermission,
  deleteRole,
  getPermissions,
  getRoles,
  setRolePermissions,
  updatePermission,
  updateRole,
} from "./access.controller";

export const roleRoutes = Router();
export const permissionRoutes = Router();

roleRoutes.use(protect, allowRoles("CEO", "DIRECTOR"));
roleRoutes.get("/", getRoles);
roleRoutes.post("/", allowRoles("CEO"), createRole);
roleRoutes.put("/:id", allowRoles("CEO"), updateRole);
roleRoutes.delete("/:id", allowRoles("CEO"), deleteRole);
roleRoutes.put(
  "/:id/permissions",
  allowRoles("CEO"),
  setRolePermissions
);

permissionRoutes.use(protect, allowRoles("CEO", "DIRECTOR"));
permissionRoutes.get("/", getPermissions);
permissionRoutes.post("/", allowRoles("CEO"), createPermission);
permissionRoutes.put("/:id", allowRoles("CEO"), updatePermission);
permissionRoutes.delete("/:id", allowRoles("CEO"), deletePermission);
