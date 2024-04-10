import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCom from "./AccountCom";
import PlacesImgCom from "./PlacesImgCom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";

const PlacesCom = () => {
  const [places, setPlaces] = useState([]);
  const { token, API } = useAuth();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await fetch(`${API}/api/user-places`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user places");
        }
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching user places:", error);
        toast.error("Failed to fetch user places. Please try again.");
      }
    };

    fetchUserPlaces();
  }, [token]);

  const handleDelete = (id) => {
    fetch(`${API}/api/user-places/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlaces(places.filter((place) => place._id !== id));
        toast.success("Listing deleted...");
      })
      .catch((error) => {
        console.error("Error deleting place:", error);
        toast.error("Failed to delete listing. Please try again.");
      });
  };

  return (
    <div>
      <AccountCom />
      <div className="text-center mb-5">
        <Link
          className="inline-flex gap-2 bg-red-500 text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
          Add New Listing
        </Link>
      </div>
      <div className="mb-4 px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <div
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
              key={place._id}
            >
              <button
                className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs z-10"
                onClick={() => handleDelete(place._id)}
              >
                Delete
              </button>
              <Link to={"/account/places/" + place._id} className="block">
                <div className="relative">
                  <PlacesImgCom place={place} />
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                    {place.maxGuests} Guests
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{place.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{place.address}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {place.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesCom;
