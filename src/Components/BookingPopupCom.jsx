import React, { useState } from "react";
import { useAuth } from "../Context/authContext";
import { Link } from "react-router-dom";

const BookingPopupCom = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Don't render the popup if it's closed
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-end">
          <button
            className="text-black transform hover:scale-110 transition-transform"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        {user ? (
          <p className="text-center font-semibold">
            <span className="text-1xl font-bold text-red-500">Hey, </span>
            {user.username}
          </p>
        ) : (
          ""
        )}
        <h2 className="text-2xl text-center font-bold mb-4">
          Special Booking Offers
        </h2>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="mb-4">
          Explore our exclusive offers and plan your next getaway with us!
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Discounts</h3>
            <p>Get up to 30% off on select destinations.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Freebies</h3>
            <p>Enjoy complimentary breakfast and spa vouchers.</p>
          </div>
          <div className="hidden lg:block md:block bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
            <p>Book now and reschedule your stay for free.</p>
          </div>
          <div className="hidden lg:block md:block bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Limited Time Offer</h3>
            <p>These offers are valid until the end of the month.</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="rounded-full bg-red-400 hover:bg-red-500 px-3 py-3 text-1xl font-semibold">
            Learn more
          </button>
          <p className="text-1xl text-blue-500">Get instant discounts...</p>
          <Link
            to={"/signup"}
            className="text-red-600 flex items-center justify-center"
          >
            Sign into your account! Click me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="w-6 h-6 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPopupCom;
