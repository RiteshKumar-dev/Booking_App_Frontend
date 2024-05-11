import React from "react";
import { Link } from "react-router-dom";

const NotFound_404 = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:mt-16 lg:pt-5">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
        Page Not Found...
      </h1>
      <p className="lg:text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg"
        alt="404 Illustration"
        className="mt-8 w-96"
      />
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white text-xl font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Go Home...
      </Link>
    </div>
  );
};

export default NotFound_404;
