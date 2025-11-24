import Reservation from "../models/reservationModel.js";

// Get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new reservation
export const addReservation = async (req, res) => {
  try {
    const { firstName, lastName, time, ...rest } = req.body;
    const reservationData = {
      ...rest,
      name: `${firstName} ${lastName}`,
      time,
      endTime: new Date(`1970-01-01T${time}`).getTime() + 2 * 60 * 60 * 1000, 
    };
    const reservation = new Reservation(reservationData);
    const saved = await reservation.save();

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reservation status 
export const updateReservationStatus = async (req, res) => {
  try {
    const { status, declineReason } = req.body;
    const updateData = { status, declineReason };

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
