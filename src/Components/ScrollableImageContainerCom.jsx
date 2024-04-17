import React from "react";
import { Link } from "react-router-dom";

const ScrollableImageContainerCom = ({ images }) => {
  return (
    <>
      <h2 className="font-bold text-3xl mt-1 px-4 flex justify-center">
        Live Anywhere...
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
      </h2>
      <div className="flex items-center justify-center mt-1">
        <div className="border-b border-gray-800 w-1/4"></div>
        {/* <div className="mx-3 text-gray-800">or</div> */}
        <div className="border-b border-gray-800 w-1/4"></div>
      </div>
      <div
        className="flex overflow-x-scroll space-x-4 p-4 mt-3 cursor-pointer"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          sOverflowStyle: "none",
        }}
      >
        {images.map((image, index) => (
          <Link key={index} to={`/places/` + image.placeId}>
            {image.url ? (
              <div className="relative">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="h-64 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200 ease-out"
                  style={{ maxWidth: "300px" }} // Set max width here
                />
                <div className="absolute left-0 top-0 bg-white p-2 rounded-full text-sm font-bold mt-2 ml-2 shadow-md shadow-gray-500">
                  Guest favourite
                </div>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ScrollableImageContainerCom;
{
  /* <div
  className="flex overflow-x-scroll space-x-4 p-4 mt-3 cursor-pointer"
  style={{
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    sOverflowStyle: "none",
  }}
>
  {images.map((image, index) => (
    <Link key={index} to={`/places/` + image.placeId}>
      <div>
        <img
          src={image.url}
          alt={`Image ${index + 1}`}
          className="h-64 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200 ease-out"
        />
        <button className="flex w-64"></button>
      </div>
    </Link>
  ))}
</div>; */
}
