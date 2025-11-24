import express from "express";
import { updateReservationStatus, addReservation, getAllReservations, deleteReservation } from "../controller/reservationController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", addReservation);
router.get("/", isAuthenticated, isAdmin, getAllReservations);
router.delete("/:id", isAuthenticated, isAdmin, deleteReservation);
router.patch("/:id", isAuthenticated, isAdmin, updateReservationStatus);

export default router;
