import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  guests: Number,
  date: Date,
  time: String,
  endTime: String,
  status: { type: String, enum: ["pending", "accepted", "confirmed", "declined", "completed"], default: "pending" },
  declineReason: String,
});

export default mongoose.model("Reservation", ReservationSchema);
