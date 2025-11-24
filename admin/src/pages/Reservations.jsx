import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationCard from "src/components/ReservationCard.jsx";
import axios from "axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/reservations");
      console.log("Reservations fetched:", res.data);
      if (Array.isArray(res.data)) {
        setReservations(res.data.filter(r => r.status === "pending"));
      } else if (res.data?.reservations) {
        setReservations(res.data.reservations.filter(r => r.status === "pending"));
      } else {
        setReservations([]);
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("Failed to load reservations");
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };


  // Delete reservation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations(reservations.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting reservation:", err);
      alert("Failed to delete reservation");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/reservations/${id}`, { status });
      setReservations(
        reservations.filter((r) => r._id !== id)
      );
      if (status === "accepted") {
        alert("Reservation accepted and moved to completed reservations after completion.");
      } else if (status === "declined") {
        alert("Reservation declined and moved to declined reservations.");
      }
    } catch (err) {
      console.error("Error updating reservation:", err);
      alert("Failed to update reservation status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reservations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchReservations}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <header className="bg-amber-600 text-white p-6 shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Reservations</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-white text-amber-600 rounded hover:bg-gray-100 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {reservations.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg">No pending reservations found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center font-semibold text-gray-700 text-sm min-w-max">
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
              onComplete={() => handleUpdateStatus(res._id, "completed")}
              onDelete={() => handleDelete(res._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
