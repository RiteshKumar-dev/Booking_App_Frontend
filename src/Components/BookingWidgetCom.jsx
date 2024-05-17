import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";

const BookingWidgetCom = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user, token, API } = useAuth();
  const [isBookingAllowed, setIsBookingAllowed] = useState(false);
  const [isBookingDisabled, setIsBookingDisabled] = useState(true);

  const handleBookingInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "checkIn") setCheckIn(value);
    else if (name === "checkOut") setCheckOut(value);
    else if (name === "numberOfGuests") setNumberOfGuests(parseInt(value));
    else if (name === "name") setName(value);
    else if (name === "phone") setPhone(value);

    setIsBookingDisabled(
      !checkIn || !checkOut || numberOfGuests <= 0 || !name || !phone
    );
  };

  useEffect(() => {
    if (user) {
      setName(user.username);
      if (user.phone) {
        setPhone(user.phone);
      }
      setIsBookingAllowed(true);
    } else {
      setIsBookingAllowed(false);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    try {
      const response = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          phone,
          place: place._id,
          price: numberOfNights * place.price,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to book place");
      }
      const data = await response.json();
      const bookingId = data._id;
      setRedirect(`/account/bookings/${bookingId}`);
      toast.success("Booking Done...");
    } catch (error) {
      console.error("Error booking place:", error);
      toast.warning("Booking not done...");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow border border-gray-300 p-4 rounded-2xl">
      <h2 className="text-2xl text-center">
        Price: ${place.price} /per night.
      </h2>
      <div className="border rounded-2xl mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="py-3 px-4">
            <label htmlFor="check-in">Check-In:</label>
            <input
              id="check-in"
              type="date"
              name="checkIn"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={checkIn}
              onChange={handleBookingInputChange}
              required
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label htmlFor="check-out">Check-Out:</label>
            <input
              id="check-out"
              type="date"
              name="checkOut"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={checkOut}
              onChange={handleBookingInputChange}
              required
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="guests">Number of guests:</label>
          <input
            id="guests"
            type="number"
            name="numberOfGuests"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={numberOfGuests}
            onChange={handleBookingInputChange}
          />
          {!numberOfGuests && (
            <p className="text-red-500 text-xs mt-1">Required.</p>
          )}
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label htmlFor="guests">Full Name:</label>
            <input
              id="guests"
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={handleBookingInputChange}
              required
            />
            {!name && (
              <p className="text-red-500 text-xs mt-1">Name is required.</p>
            )}
            <label htmlFor="guests">Phone Number:</label>
            <input
              id="guests"
              type="tel"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={phone}
              onChange={handleBookingInputChange}
              autoComplete="off"
              required
            />
            {!phone && (
              <p className="text-red-500 text-xs mt-1">
                Phone number is required.
              </p>
            )}
          </div>
        )}
      </div>
      <button
        onClick={isBookingAllowed ? bookThisPlace : undefined}
        className={`bg-red-500 p-2 shadow rounded-2xl mt-4 block w-full text-white text-center ${
          isBookingAllowed ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={isBookingDisabled}
      >
        Reserve or Book Now!
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidgetCom;
