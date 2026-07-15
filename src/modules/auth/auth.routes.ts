import { Router } from "express";
import {
  adminRegister,
  forgotPassword,
  getMe,
  getUsers,
  login,
  logout,
  register,
  resetPassword,
  setup,
  setupStatus,
  verifyOtp,
} from "./auth.controller";
import { allowRoles, protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

router.get("/users", protect, allowRoles("CEO", "DIRECTOR", "OPERATIONS_MANAGER", "HR"), getUsers);
router.post("/admin-register", protect, allowRoles("CEO", "DIRECTOR", "HR"), adminRegister);

router.get("/setup-status", setupStatus);
router.post("/setup", setup);

export default router;
