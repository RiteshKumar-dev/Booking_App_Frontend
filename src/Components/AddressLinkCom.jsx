import React from "react";
import { toast } from "react-toastify";

const AddressLinkCom = ({ children, className = null }) => {
  const handleShareBtn = () => {
    toast.success("Share successfull...");
  };
  const handleSaveBtn = () => {
    toast.success("Saved in gallery...");
  };
  if (!className) {
    className = "flex my-3 block";
  }
  className += "flex gap-1 font-semibold underline";
  return (
    <div className="flex flex-wrap items-center">
      <a
        className={className}
        target="_blank"
        href={"https://maps.google.com/?q=" + children}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        <p className="flex truncate">{children}</p>
      </a>
      <div className="lg:ml-auto flex">
        <button
          className="text-black font-semibold  hover:font-bold underline px-4 py-2 rounded-full flex gap-2"
          onClick={handleShareBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Share...
        </button>
        <button
          className="text-black font-semibold hover:font-bold underline px-4 py-2 rounded-full flex gap-2"
          onClick={handleSaveBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Save...
        </button>
      </div>
    </div>
  );
};

export default AddressLinkCom;
