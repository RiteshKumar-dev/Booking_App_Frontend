import React, { useState } from "react";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FilterCom = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);
  const { authorizationToken, user, API } = useAuth();
  const URL = `${API}/api/form/contacts`;
  if (userData && user) {
    setContactInfo({ username: user.username, email: user.email, message: "" });
    setUserData(false);
  }
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(contactInfo),
      });
      if (response.ok) {
        setContactInfo({ username: "", email: "", message: "" });
        const data = await response.json();
        console.log(data);
        toast.success("Message send...");
        setIsPopupOpen(false);
      } else {
        toast.error("Message not send...!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <div
        className="hidden lg:flex cursor-pointer items-center justify-center font-semibold border border-gray-300 rounded-3xl lg:py-1 lg:px-2 shadow-md shadow-gray-200 lg:w-1/5 mt-3 py-2 px-4  md:mb-2 mb-2"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          sOverflowStyle: "none",
        }}
        onClick={handleFilterClick}
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <span className="ms-3 sm:text-sm lg:text-lg font-semibold text-black">
          Connect...
        </span>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="flex items-center w-auto justify-centerbg-gray-100">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
              {/* Left side - Security image */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?w=740"
                  alt="Security Image"
                  className="max-w-xs"
                />
              </div>
              {/* Right side - Login form */}
              <div className="lg:w-1/2 bg-white p-8">
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseClick}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-2xl font-bold mb-4 underline">
                  Report Us...
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative z-0">
                    <input
                      type="text"
                      name="username"
                      id="floating_standard_text"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={contactInfo.username}
                      onChange={handleInputs}
                    />
                    <label
                      htmlFor="floating_standard_text"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Username...
                    </label>
                  </div>
                  <div className="relative z-0">
                    <input
                      type="email"
                      name="email"
                      id="floating_standard_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={contactInfo.email}
                      onChange={handleInputs}
                    />
                    <label
                      htmlFor="floating_standard_password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Email...
                    </label>
                  </div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    onChange={handleInputs}
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
                  >
                    Send
                  </button>
                </form>
                <div className="flex items-center justify-center">
                  <div className="border-b border-gray-400 w-1/4"></div>
                  <div className="mx-3 text-gray-800">or</div>
                  <div className="border-b border-gray-400 w-1/4"></div>
                </div>
                <p className="text-center mt-4">
                  Don't have an account?
                  <Link
                    to={"/signup"}
                    className="font-bold underline text-red-500"
                  >
                    Sign up...
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterCom;

/**<div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 mt-5">
            <div className="flex justify-end">
              <button
                onClick={handleCloseClick}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr className="mt-2 border-t-2 border-gray-300 mb-2" />
            <div className="flex justify-between">
              <div className="">
                <div className="">
                  <div className="w-full">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                      Contact Us...
                    </h2>
                    <div className="mt-5 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <div className="mt-1">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              autoComplete="off"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Enter your username"
                              value={contactInfo.username}
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="off"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Enter your email"
                              value={contactInfo.email}
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Message
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="message"
                              name="message"
                              rows="4"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Enter your message"
                              value={contactInfo.message}
                              onChange={handleInputs}
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */
