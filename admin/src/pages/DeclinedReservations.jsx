import React, { useEffect, useState } from "react";
import ReservationCard from "src/components/ReservationCard.jsx";
import axios from "axios";

const DeclinedReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);

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
        const declined = allReservations.filter(r => r.status === "declined");
        setReservations(declined);
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
        setSelectedReservations(selectedReservations.filter((selectedId) => selectedId !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleSelectReservation = (id) => {
    setSelectedReservations((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    if (selectedReservations.length === reservations.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(reservations.map((r) => r._id));
    }
  };
  const handleBulkDelete = () => {
    if (selectedReservations.length === 0) {
      alert("Please select reservations to delete.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedReservations.length} reservation(s)?`)) return;

    Promise.all(
      selectedReservations.map((id) => axios.delete(`/api/reservations/${id}`))
    )
      .then(() => {
        setReservations(reservations.filter((r) => !selectedReservations.includes(r._id)));
        setSelectedReservations([]);
        alert("Selected reservations deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting reservations:", err);
        alert("Failed to delete some reservations.");
      });
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
      <h1 className="text-3xl font-bold mb-6">Declined Reservations</h1>

      {reservations.length > 0 && (
        <div className="mb-4 flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedReservations.length === reservations.length && reservations.length > 0}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
          <button
            onClick={handleBulkDelete}
            disabled={selectedReservations.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 transition"
          >
            Delete Selected ({selectedReservations.length})
          </button>
        </div>
      )}

      {reservations.length === 0 ? (
        <p className="text-gray-500">No declined reservations found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 font-semibold text-gray-700 text-sm">
              <div className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                Select
              </div>
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Date</div>
              <div>Time</div>
              <div>Guests</div>
            </div>
          </div>
          {reservations.map((res) => (
            <div key={res._id} className="border-b border-gray-200 last:border-b-0">
              <div className="flex items-center">
                <div className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedReservations.includes(res._id)}
                    onChange={() => handleSelectReservation(res._id)}
                    className="mr-2"
                  />
                </div>
                <div className="flex-1">
                  <ReservationCard
                    reservation={res}
                    onAccept={() => handleUpdateStatus(res._id, "accepted")}
                    onDecline={(reason) => handleUpdateStatus(res._id, "declined", reason)}
                    onDelete={() => handleDelete(res._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeclinedReservations;
