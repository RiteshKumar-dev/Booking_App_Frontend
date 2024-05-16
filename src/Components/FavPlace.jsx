import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import ScrollableImageContainer from "./ScrollableImageContainerCom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
import LoadingCom from "./LoadingCom";
import GoogleMapCom from "./GoogleMapCom";
import { FaUserShield, FaUsers, FaAddressBook, FaCogs } from "react-icons/fa";
import "./Animate-flash.css";

const SuspenseImage = ({ src, alt, ...rest }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();
  }, [src]);

  if (isLoading) {
    return <LoadingCom />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return image ? <img src={image} alt={alt} {...rest} /> : null;
};

const FavPlace = ({ price }) => {
  const [places, setPlaces] = useState([]);
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState({});
  const [likes, setLikes] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGSTOn, setIsGSTOn] = useState(false); // State to track GST application
  const { API, user } = useAuth();

  useEffect(() => {
    fetch(`${API}/api/places`)
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
        // Initialize currentPhotoIndices for each place to 0
        const initialIndices = {};
        data.forEach((place) => {
          initialIndices[place._id] = 0;
        });
        setCurrentPhotoIndices(initialIndices);
      })
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  useEffect(() => {
    const initialLikes = {};
    places.forEach((place) => {
      initialLikes[place._id] = false;
    });
    setLikes(initialLikes);
  }, [places]);

  const handleNextPhoto = (placeId) => {
    setCurrentPhotoIndices((prevIndices) => {
      const currentIndex = prevIndices[placeId];
      const nextIndex =
        currentIndex ===
        places.find((place) => place._id === placeId).photos.length - 1
          ? 0
          : currentIndex + 1;
      return { ...prevIndices, [placeId]: nextIndex };
    });
  };
  const handlePrevPhoto = (placeId) => {
    setCurrentPhotoIndices((prevIndices) => {
      const currentIndex = prevIndices[placeId];
      const lastIndex =
        places.find((place) => place._id === placeId).photos.length - 1;
      const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      return { ...prevIndices, [placeId]: prevIndex };
    });
  };
  const handleLikeClick = async (placeId) => {
    try {
      const response = await fetch(`${API}/api/places/${placeId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ like: likes[placeId] }), // Sending the current like status
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Check the response from the server
      // Update the like status in the component state
      setLikes((prevLikes) => ({
        ...prevLikes,
        [placeId]: data.newLikeStatus, // Use the new like status from the server
      }));
      if (data.newLikeStatus) {
        toast.success("Add to favourite...");
      } else {
        toast.warning("Remove from favourite...");
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error updating like status:", error);
      toast.error("Failed to update like status.");
    }
  };
  const checkAdminIs = () => {
    toast.info("You're not an admin!");
  };
  return (
    <>
      <h2 className="font-bold lg:text-3xl text-red-500 mt-1 px-4 flex justify-center underline lg:mt-10 lg:pt-10">
        User's favourite place's...
      </h2>
      <div className="px-6 lg:mt-4 md:mt-10 mt-5 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places
          .filter((place) => place.likeStatus)
          .map((place) => (
            <Link to={"/places/" + place._id} key={place._id}>
              <div className="bg-gray-500 mb-3 rounded-2xl relative">
                <Suspense fallback={<div>Loading...</div>}>
                  {place.photos?.[currentPhotoIndices[place._id]] ? (
                    <div className="relative group">
                      <SuspenseImage
                        onLoad={() => setImageLoaded(true)}
                        className="rounded-2xl object-cover aspect-square transform hover:scale-105 transition-transform duration-200 ease-out"
                        src={
                          place.photos[currentPhotoIndices[place._id]].includes(
                            "cloudinary"
                          )
                            ? place.photos[currentPhotoIndices[place._id]]
                            : `${API}/uploads/` +
                              place.photos[currentPhotoIndices[place._id]]
                        }
                        alt="Image"
                      />
                      {!imageLoaded && (
                        <div className="bg-gray-300 rounded-2xl object-cover aspect-square transform hover:scale-105 transition-transform duration-200 ease-out"></div>
                      )}
                      <button
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2 rounded-full bg-white opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity duration-300"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleNextPhoto(place._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2 md:w-4 md:h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                      <button
                        className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2 rounded-full bg-white opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity duration-300"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handlePrevPhoto(place._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2 md:w-4 md:h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {place.photos.map((photo, index) => (
                          <div
                            key={index}
                            className={`rounded-full ${
                              index === currentPhotoIndices[place._id]
                                ? "bg-red-500 md:w-2 md:h-2 w-1 h-1"
                                : "bg-gray-300 md:w-2 md:h-2 w-1 h-1"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>No photo available</p>
                  )}
                  <button
                    className="absolute top-1 right-1 p-2 rounded-full"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleLikeClick(place._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 md:w-7 md:h-7 text-${
                        // user._id === place.owner && place.likeStatus
                        place.likeStatus ? "red-600" : "white"
                      }`}
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </button>
                  <div
                    className={`${
                      place.likeStatus
                        ? "absolute left-0 top-0 bg-white p-2 rounded-full text-sm font-bold mt-2 ml-2 shadow-md shadow-gray-500 sm:hidden hidden lg:block md:block"
                        : "hidden"
                    }`}
                  >
                    Guest favourite
                  </div>
                </Suspense>
              </div>
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm truncate text-gray-500"> {place.title}</h3>
              <div className="mt-1 gap-x-1 truncate">
                <span className="font-bold">
                  ${isGSTOn ? place.price + place.price * 0.18 : place.price}
                </span>
                <span className="gap-x-1   underline">
                  /{isGSTOn ? "total before taxes" : "per night."}
                </span>
              </div>
            </Link>
          ))}
      </div>
      <hr className="mt-5 border-t-2 border-gray-300 mb-4" />
      <ScrollableImageContainer
        images={places.map((place) => ({
          url: place.photos[1],
          placeId: place._id,
        }))}
      />
      <hr className="mt-5 border-t-2 border-gray-300 mb-4" />
      <div className="lg:mt-5 lg:pt- px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded-2xl mt-2 flex items-center justify-center gap-1 border border-red-500"
          to={user.isAdmin ? "/admin" : ""}
          onClick={() => (user.isAdmin ? "" : checkAdminIs())}
        >
          <FaUserShield className="mr-2" />
          Stay's
        </Link>
        <Link
          to={user.isAdmin ? "/admin/users" : ""}
          onClick={() => (user.isAdmin ? "" : checkAdminIs())}
          className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded-2xl mt-2 flex items-center justify-center gap-1 border border-red-500"
        >
          <FaUsers className="mr-2" />
          Experiences
        </Link>
        <Link
          to={user.isAdmin ? "/admin/contacts" : ""}
          onClick={() => (user.isAdmin ? "" : checkAdminIs())}
          className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded-2xl mt-2 flex items-center justify-center gap-1 border border-red-500"
        >
          <FaAddressBook className="mr-2" />
          Online Experiences
        </Link>
        <Link
          to={user.isAdmin ? "/admin/services" : ""}
          onClick={() => (user.isAdmin ? "" : checkAdminIs())}
          className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded-2xl mt-2 flex items-center justify-center gap-1 border border-red-500"
        >
          <FaCogs className="mr-2" />
          Services
        </Link>
      </div>
      <hr className="mt-5 border-t-2 border-gray-300 mb-4" />
      <GoogleMapCom />
    </>
  );
};

export default FavPlace;
