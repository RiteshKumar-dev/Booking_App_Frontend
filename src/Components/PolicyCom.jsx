import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PolicyCom = () => {
  const [redirect, setRedirect] = useState(false);
  const handleReport = (ev) => {
    ev.preventDefault();
    toast.success("Report send successfully!...");
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:mt-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-64 object-fit"
          src="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Policy"
        />
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Let's_Go Privacy...
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor nibh vitae lacinia posuere. Donec vitae nisi nec mi dictum
              euismod.
            </p>
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cancellation Policy
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor nibh vitae lacinia posuere. Donec vitae nisi nec mi dictum
              euismod.
            </p>
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Refund Policy
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor nibh vitae lacinia posuere. Donec vitae nisi nec mi dictum
              euismod.
            </p>
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Privacy Policy
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor nibh vitae lacinia posuere. Donec vitae nisi nec mi dictum
              euismod.
            </p>
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Terms of Service
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor nibh vitae lacinia posuere. Donec vitae nisi nec mi dictum
              euismod.
            </p>
          </div>
          <hr className="mt-2 border-t-2 border-gray-300" />

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handleReport}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Report
            </button>
            <Link
              to={"/"}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCom;
