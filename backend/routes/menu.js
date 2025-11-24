import express from "express";
import multer from "multer";
import { getAllMenu, addMenu, updateMenu, deleteMenu } from "../controller/menuController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", getAllMenu);
router.post("/", isAuthenticated, isAdmin, upload.single("image"), addMenu);
router.put("/:id", isAuthenticated, isAdmin, upload.single("image"), updateMenu);
router.delete("/:id", isAuthenticated, isAdmin, deleteMenu);

export default router;
