import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Success = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          Reservation Request Sent!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for reserving a table with <span className="font-semibold">Lanka Delight</span>. 
          Your reservation request has been received. You will be notified with further details via email or phone.
        </p>
        <p className="text-gray-500 mb-6">
          Redirecting to home in <span className="font-semibold">{countdown}</span> seconds...
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
        >
          Back to Home <HiOutlineArrowNarrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Success;
