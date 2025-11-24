import React, { useEffect, useState } from "react";
import ReservationCard from "src/components/ReservationCard.jsx";
import axios from "axios";

const CompletedReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reservations")
      .then((res) => {
        console.log("Reservations fetched:", res.data);
        let allReservations = [];
        if (Array.isArray(res.data)) {
          allReservations = res.data;
        } else if (res.data?.reservations) {
          allReservations = res.data.reservations;
        }
        const completed = allReservations.filter(r => r.status === "completed");
        setReservations(completed);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setReservations([]);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        setReservations(reservations.filter((r) => r._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateStatus = (id, status, declineReason = "") => {
    axios
      .patch(`/api/reservations/${id}`, { status, declineReason })
      .then((res) => {
        setReservations(
          reservations.map((r) => (r._id === id ? { ...r, status, declineReason } : r))
        );
        console.log(`Reservation ${status} - email sent to user`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Completed Reservations</h1>

      {reservations.length === 0 && (
        <p className="text-gray-500">No completed reservations found.</p>
      )}

      {reservations.length === 0 ? (
        <p className="text-gray-500">No completed reservations found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 font-semibold text-gray-700 text-sm">
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Date</div>
              <div>Time</div>
              <div>Guests</div>
            </div>
          </div>
          {reservations.map((res) => (
            <ReservationCard
              key={res._id}
              reservation={res}
              onAccept={() => handleUpdateStatus(res._id, "accepted")}
              onDecline={(reason) => handleUpdateStatus(res._id, "declined", reason)}
              onDelete={() => handleDelete(res._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedReservations;
