import React from "react";
import { Link } from "react-router-dom";

const NotFound_404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg"
        alt="404 Illustration"
        className="mt-8 w-96"
      />
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound_404;
