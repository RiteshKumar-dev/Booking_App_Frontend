import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidgetCom from "./BookingWidgetCom";
import PlaceGalleryCom from "./PlaceGalleryCom";
import AddressLinkCom from "./AddressLinkCom";
import ReviewCom from "./ReviewCom";
import MapCom from "./MapCom";
import { useAuth } from "../Context/authContext";

const UserPlaceCom = () => {
  const { id } = useParams();
  // console.log(id);
  const [place, setPlace] = useState(null);
  const { API } = useAuth();

  useEffect(() => {
    if (!id) {
      return;
    }

    // fetch(`${API}/api/places/${id}`)
    fetch(`${API}/api/places/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlace(data);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, [id]);

  if (!place) {
    return null; // Return null or a loading indicator until place data is fetched
  }

  return (
    <div className="-mt-3 lg:mt-14 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl truncate">{place.title}</h1>
      <AddressLinkCom>{place.address}</AddressLinkCom>
      <PlaceGalleryCom place={place} />
      <div className="mb-8 mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold mb-2 text-3xl underline">
              About this space ...
            </h2>
            {place.description}
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />
          <div className="flex gap-2">
            <p className="font-semibold mb-2 text-2xl underline">Check-In:</p>
            <p className="font-semibold mb-2 text-2xl"> {place.checkIn}:00am</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold mb-2 text-2xl underline"> Check-Out:</p>
            <p className="font-semibold mb-2 text-2xl">{place.checkOut}:00pm</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold mb-2 text-2xl underline">
              Max number of guests:
            </p>
            <p className="font-semibold mb-2 text-2xl">{place.maxGuests}</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </p>
          </div>
        </div>
        <div>
          <BookingWidgetCom place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold mb-2 text-3xl underline">
            Other things to note...
          </h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5 mt-2">
          {place.extraInfo}
        </div>
        <MapCom place={place.address} />
      </div>
      <ReviewCom place={place} />
    </div>
  );
};

export default UserPlaceCom;
