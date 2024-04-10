import React from "react";
import { differenceInCalendarDays, format } from "date-fns";

const PerNightsCom = ({ booking }) => {
  return (
    <div className="mt-2 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
          clipRule="evenodd"
        />
      </svg>
      {differenceInCalendarDays(
        new Date(booking.checkOut),
        new Date(booking.checkIn)
      )}
      nights:
    </div>
  );
};

export default PerNightsCom;
