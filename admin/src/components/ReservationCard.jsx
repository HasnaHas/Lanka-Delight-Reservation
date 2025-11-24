import React from "react";

const ReservationCard = ({
  reservation,
  onAccept,
  onDecline,
  onDelete,
  onComplete,
}) => {
  const { name, email, phone, date, time, guests, status, declineReason } = reservation;

  return (
    <div className="bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center text-sm min-w-max">
            <div>{name}</div>
            <div>{email}</div>
            <div>{phone}</div>
            <div>{date}</div>
            <div>{time}</div>
            <div>{guests}</div>
          </div>
          <div className="mt-2">
            <span className={`font-semibold ${status === "accepted" ? "text-green-600" : status === "declined" ? "text-red-600" : status === "completed" ? "text-blue-600" : "text-yellow-600"}`}>
              Status: {status}
            </span>
            {status === "declined" && declineReason && (
              <span className="text-red-600 ml-4"><strong>Reason:</strong> {declineReason}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
{status === "pending" && (
            <>
              <button
                onClick={onAccept}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
              >
                Accept
              </button>
              <button
                onClick={onDecline}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Decline
              </button>
              <button
                onClick={() => window.open(`mailto:${email}`, "_blank`")}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                title="Send Email"
                style={{marginLeft: '8px'}}
              >
                Gmail
              </button>
            </>
          )}
          {(status === "accepted" || status === "confirmed") && onComplete && (
            <button onClick={onComplete}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              Complete
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
