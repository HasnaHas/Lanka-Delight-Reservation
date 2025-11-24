import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");

  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const reservationData = {
        firstName,
        lastName,
        email,
        phone,
        date,
        time,
        guests,
        requests,
      };

      await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      navigate("/success");
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <section id="reservation"  className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200/40 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300/30 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className="space-y-10 bg-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Reserve Your Table
              </h2>
              <p className="text-gray-600 text-lg">
                Secure your table for an unforgettable dining experience. Fill out your details and we’ll confirm your reservation shortly.
              </p>
            </div>

            <form onSubmit={handleReservation} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Guests"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
                  required
                />
              </div>

              <textarea
                placeholder="Special Requests (optional)"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={3}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition"
              />

              <button
                type="submit"
                className="w-full lg:w-auto bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Reserve Now</span>
                <HiOutlineArrowNarrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Side: Restaurant Info Panel */}
          <div className="space-y-6 bg-gradient-to-b from-orange-100/80 to-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-orange-200">
            <h3 className="text-3xl font-bold text-orange-600">Restaurant Info</h3>
            <div className="text-gray-700 space-y-3">
              <p><span className="font-semibold">Opening Hours:</span> Mon–Fri 10:00 AM – 10:00 PM</p>
              <p><span className="font-semibold">Weekend Hours:</span> Sat–Sun 9:00 AM – 11:00 PM</p>
              <p><span className="font-semibold">Location:</span> 123 Colombo Street, Sri Lanka</p>
              <p><span className="font-semibold">Contact:</span> +94 11 234 5678 |lankadelight@yums.com</p>
              <p><span className="font-semibold">Reservation Info:</span> Free table reservation. Confirmation sent via email/mobile within 24 hours.</p>
              <p><span className="font-semibold">Enquiries:</span> Feel free to contact us anytime.</p>
              <p className="text-orange-600 font-semibold">Tip:</p>
              <p className="text-gray-600">Reservations recommended during peak hours.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reservation;
