import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddressLinkCom from "./AddressLinkCom";
import PlaceGalleryCom from "./PlaceGalleryCom";
import { toast } from "react-toastify";
import BookingDateCom from "./BookingDateCom";
import PerNightsCom from "./PerNightsCom";
import { useAuth } from "../Context/authContext";

const BooKingCom = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { token, API } = useAuth();

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await fetch(`${API}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const foundBooking = data.find((booking) => booking._id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id, token]);

  const handlePayment = () => {
    setRedirect(true);
  };

  if (!booking || !booking.place) {
    return null;
  }

  if (redirect) {
    return <Navigate to={"/payment"} />;
  }

  return (
    <div className="lg:mt-20 mt-5">
      <h1 className="text-3xl truncate">{booking.place.title}</h1>

      <AddressLinkCom className="flex block my-2 mt-1">
        {booking.place.address}
      </AddressLinkCom>
      <div className="bg-gray-300 p-4 my-4 rounded-2xl">
        <h2 className="text-xl font-semibold">Your Booking Information...</h2>
        <div className="flex gap-2">
          <PerNightsCom booking={booking} />
          <BookingDateCom booking={booking} />
        </div>
        <button
          className="flex gap-2 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handlePayment}
        >
          Total Price:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
              clipRule="evenodd"
            />
          </svg>
          {booking.price}
        </button>
        {/* <button
          onClick={handleDelete}
          className="relative top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs"
        >
          Delete
        </button> */}
      </div>
      <PlaceGalleryCom place={booking.place} />
    </div>
  );
};

export default BooKingCom;
