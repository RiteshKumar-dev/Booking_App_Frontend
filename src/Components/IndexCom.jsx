import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import PlaceOptionsCom from "./PlaceOptionsCom";
import ScrollableImageContainer from "./ScrollableImageContainerCom";
import { toast } from "react-toastify";
import MapCom from "./MapCom";
import { useAuth } from "../Context/authContext";
import AdminMainIdx from "./AdminMainIdx";

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
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="relative inline-block">
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return image ? <img src={image} alt={alt} {...rest} /> : null;
};

const IndexCom = ({ price }) => {
  const [places, setPlaces] = useState([]);
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState({});
  const [likes, setLikes] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGSTOn, setIsGSTOn] = useState(false); // State to track GST application
  const { API } = useAuth();

  useEffect(() => {
    // fetch(`${API}/api/places`)
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
  const handleLikeClick = (placeId) => {
    toast.success("Guest favourite...");
    setLikes((prevLikes) => ({
      ...prevLikes,
      [placeId]: !prevLikes[placeId],
    }));
  };

  const handleToggleGST = () => {
    setIsGSTOn((prevIsGSTOn) => !prevIsGSTOn);
  };

  return (
    <>
      <PlaceOptionsCom isGSTOn={isGSTOn} handleToggleGST={handleToggleGST} />
      <div className="px-6 lg:mt-48 md:mt-10 mt-5 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((place) => (
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
                      likes[place._id] ? "red-500" : "white"
                    }`}
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </button>
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
        images={places.map((place) => place.photos[0])}
      />
      <AdminMainIdx />
      {/* <MapCom place={places.map((place) => place.address)} /> */}
      <ScrollableImageContainer
        images={places.map((place) => place.photos[1])}
      />
    </>
  );
};

export default IndexCom;
