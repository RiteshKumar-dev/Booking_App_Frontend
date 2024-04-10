import React from "react";
import { useAuth } from "../Context/authContext";

const PlaceImgCom = ({ place, idx = 0, className = null, onDelete }) => {
  const { API } = useAuth();
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover w-full h-48 sm:h-37 rounded-t-lg";
  }
  const handleDelete = () => {
    onDelete(place._id);
  };

  return (
    <div className="relative">
      <img
        className={className}
        src={
          place.photos[0].includes("cloudinary")
            ? place.photos[0]
            : `${API}/uploads/` + place.photos[0]
        }
        alt={place.title}
      />
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs"
      >
        Delete
      </button>
    </div>
  );
};

export default PlaceImgCom;
