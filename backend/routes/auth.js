import express from "express";
import {
  signup,
  login,
  logout,
} from "../controller/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

export default router;
