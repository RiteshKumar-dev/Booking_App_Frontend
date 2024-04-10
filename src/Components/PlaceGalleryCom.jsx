import React, { useState } from "react";
import { useAuth } from "../Context/authContext";

const PlaceGalleryCom = ({ place }) => {
  const { API } = useAuth();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white lg:mt-20">
        <div className="p-8 bg-black">
          <h1 className="text-3xl font-bold mb-8">Photos of...</h1>
          <h1 className="text-2xl font-bold mb-8">{place.title}..</h1>
          <div
            className="max-w-6xl mx-auto h-full overflow-y-auto"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              sOverflowStyle: "none",
            }}
          >
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={
                        photo.includes("cloudinary")
                          ? photo
                          : `${API}/uploads/` + photo
                      }
                      alt=""
                      className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-transparent  font-bold text-red-800 py-2 px-4 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 m-4">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-6 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            Photos
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-2 grid-cols-[2fr_1fr]">
      <div>
        {place.photos?.[0] && (
          <div className="bg-gray-500 rounded-2xl overflow-hidden aspect-square">
            {/* <img
              onClick={() => setShowAllPhotos(true)}
              className="object-cover cursor-pointer w-full h-full transform hover:scale-105 transition-transform duration-300"
              src={`${API}/uploads/` + place.photos[0]}
              alt="Image"
            /> */}
            <img
              onClick={() => setShowAllPhotos(true)}
              className="object-cover cursor-pointer w-full h-full transform hover:scale-105 transition-transform duration-300"
              src={
                place.photos[0].includes("cloudinary")
                  ? place.photos[0]
                  : `${API}/uploads/` + place.photos[0]
              }
              alt="Image"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2">
        {place.photos?.[1] && (
          <div className="bg-gray-500 rounded-2xl overflow-hidden aspect-square">
            <img
              onClick={() => setShowAllPhotos(true)}
              className="object-cover cursor-pointer w-full h-full transform hover:scale-105 transition-transform duration-300"
              src={
                place.photos[1].includes("cloudinary")
                  ? place.photos[1]
                  : `${API}/uploads/` + place.photos[1]
              }
              alt="Image"
            />
          </div>
        )}
        {place.photos?.[2] && (
          <div className="bg-gray-500 rounded-2xl overflow-hidden aspect-square relative">
            <img
              onClick={() => setShowAllPhotos(true)}
              className="object-cover cursor-pointer w-full h-full transform hover:scale-105 transition-transform duration-300"
              src={
                place.photos[2].includes("cloudinary")
                  ? place.photos[2]
                  : `${API}/uploads/` + place.photos[2]
              }
              alt="Image"
            />
            <button
              onClick={() => setShowAllPhotos(true)}
              type="button"
              className="hidden sm:flex text-white cursor-pointer flex gap-2 absolute bottom-2 right-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              style={{
                bottom: "2rem",
                right: "2rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clipRule="evenodd"
                />
              </svg>
              Show More Photos...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceGalleryCom;
