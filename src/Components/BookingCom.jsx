import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddressLinkCom from "./AddressLinkCom";
import PlaceGalleryCom from "./PlaceGalleryCom";
import { toast } from "react-toastify";
import BookingDateCom from "./BookingDateCom";
import PerNightsCom from "./PerNightsCom";
import { useAuth } from "../Context/authContext";
import { loadStripe } from "@stripe/stripe-js";

const BooKingCom = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { token, API, Stripe_Publishable_Key } = useAuth();

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

  const handlePayment = async () => {
    try {
      const stripePromise = loadStripe(Stripe_Publishable_Key);
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe initialization failed");
      }

      const response = await fetch(`${API}/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch booking details");
      }

      const data = await response.json();
      const bookingId = data.bookingData._id;

      if (!bookingId) {
        console.error("Booking not found");
        return;
      }

      const sessionResponse = await fetch(
        `${API}/api/create-checkout-session/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId: bookingId }),
        }
      );

      if (!sessionResponse.ok) {
        throw new Error("Failed to create checkout session");
      }

      const sessionData = await sessionResponse.json();

      if (sessionData.id) {
        const stripeRes = await stripe.redirectToCheckout({
          sessionId: sessionData.id,
        });
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", stripeRes);
        // toast.success("Place booked success fully...");
        if (stripeRes.error) {
          console.error(
            "Error during redirect to checkout:",
            stripeRes.error.message
          );
        }
      } else {
        console.error("Session creation failed");
      }
    } catch (error) {
      console.log("Error during payment process", error);
    }
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
        <hr className="mt-2 border-t-2 border-gray-200" />

        <div className="flex gap-2">
          <PerNightsCom booking={booking} />
          <BookingDateCom booking={booking} />
        </div>
        <hr className="mt-2 border-t-2 border-gray-200" />

        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          {booking.numberOfGuests || 1}Guests.
        </div>
        <hr className="mt-2 border-t-2 border-gray-200" />

        {booking.isBooked ? (
          <button className="flex gap-2 mt-2 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full">
            Booking Status:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
            Success
          </button>
        ) : (
          <button
            className="flex gap-2 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              handlePayment(booking._id);
            }}
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
        )}
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
