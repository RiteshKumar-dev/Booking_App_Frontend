import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountCom from "./AccountCom";
import PlaceImgCom from "./PlacesImgCom";
import BookingDateCom from "./BookingDateCom";
import { useAuth } from "../Context/authContext";
import PerNightsCom from "./PerNightsCom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { token, API } = useAuth();

  useEffect(() => {
    fetch(`${API}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API}/api/bookings/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        window.location.href = "/account/bookings";
        toast.success("Booking Deleted...");
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };
  const handleStripeStatus = (ev) => {
    ev.preventDefault();
    ev.stopPropogation();
  };

  return (
    <div>
      <AccountCom />
      <div>
        {bookings?.length > 0 ? (
          bookings.map((booking, index) => {
            // Check if the place associated with the booking exists
            if (!booking.place) {
              return null; // Skip rendering this booking
            }

            return (
              <Link to={`/account/bookings/${booking._id}`} key={index}>
                <div
                  className="bg-gray-300 rounded-2xl overflow-hidden mb-8"
                  key={index}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
                      <PlaceImgCom
                        place={booking.place}
                        onDelete={() => handleDelete(booking._id)}
                        onStatus={() => handleStripeStatus}
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 p-4">
                      <h2 className="text-xl font-bold">
                        {booking.place.title}
                      </h2>
                      <BookingDateCom booking={booking} />
                      <PerNightsCom booking={booking} />
                      <div className="mt-2 flex items-center gap-1 font-semibold">
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
                        Total Price: ${booking.price}
                      </div>
                      <div className="mt-2 flex items-center gap-1 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Owner: {booking.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-gray-500 text-center text-4xl font-semibold underline decoration-gray-300">
            You have no bookings...
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
