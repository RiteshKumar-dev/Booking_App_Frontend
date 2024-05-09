import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import LoadingCom from "./LoadingCom";
const NavbarPage = () => {
  let { pathname } = useLocation();
  const [isSunClicked, setIsSunClicked] = useState(true);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // if (!user) {
  //   return <LoadingCom />;
  // }

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen && searchValue.trim() !== "") {
      console.log("Search value:", searchValue);
      setSearchValue("");
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const toggleTheme = () => {
    setIsSunClicked(!isSunClicked);
    document.body.style.backgroundColor = isSunClicked ? "black" : "white";
    document.body.style.color = isSunClicked ? "white" : "black";
  };
  // let subPage = pathname.split("/")?.[2];
  if (pathname === "/account") {
    pathname = "profile";
  }
  function linkClasses(type) {
    let classes = "flex  gap-2 py-2 px-4 ";
    if (type === pathname) {
      classes += "bg-red-500 flex text-white gap-2 rounded-full py-2 px-4";
    } else {
      classes += "bg-gray-200 flex gap-2 rounded-full py-2 px-4 mt-2";
    }
    return classes;
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <header className="lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 flex justify-around items-center px-4 py-2 md:px-8 md:py-4 bg-white lg:shadow-md mb-5 gap-2">
          <Link
            to={"/"}
            className="flex items-center text-red-500 text-semibold"
          >
            <img
              src="https://pngimg.com/d/google_maps_pin_PNG76.png"
              alt="Nav_Logo"
              className="h-12 cover object-fit"
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg> */}
            <span className="font-bold text-3xl hidden lg:block">Let's_Go</span>
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png"
              alt="Airbnb Logo"
              className="h-11 hidden lg:block"
            />
            <img
              src="https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png"
              alt="Airbnb Logo"
              className="h-11 block lg:hidden"
            /> */}
          </Link>
          <div className="relative">
            <div className="hidden md:flex border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500">
              <div className="font-semibold">Any Where</div>
              <div className="border-l border-gray-300"></div>
              <div>Any Week</div>
              <div className="border-l border-gray-300"></div>
              <div className="font-semibold">Add guests</div>
              <button
                onClick={handleSearchClick}
                className="bg-red-600 text-white p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            {searchOpen && (
              <div className="relative z-0">
                <input
                  type="text"
                  name="username"
                  id="floating_standard_text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <label
                  htmlFor="floating_standard_text"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Serach...
                </label>
              </div>
            )}
          </div>
          {/* For Laptop view */}
          <Link
            to={user ? "/account" : "/login"}
            className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500"
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

            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              {user ? (
                <div className="w-7 h-7 bg-gray-300 overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={
                      user.profilePic ||
                      "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png"
                    }
                    alt="userImage"
                  />
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 relative top-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </Link>
          {/* For phone view */}
          <Link
            className="lg:hidden md:hidden sm:relative cursor-pointer"
            to={user ? "/account" : "/login"}
          >
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500"
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
              <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                {user ? (
                  <div className="w-7 h-7 bg-gray-300 overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        user.profilePic ||
                        "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png"
                      }
                      alt="userImage"
                    />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 relative top-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
            {isOpen && user && (
              <div className="absolute right-3 mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden z-10">
                <div className="px-4 py-2">
                  <Link
                    className={linkClasses("profile")}
                    to={"/account"}
                    onClick={closeDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {!!user ? (
                      <div
                        className="truncate overflow-hidden"
                        style={{ maxHeight: "2.5rem" }}
                      >
                        {user.username}
                      </div>
                    ) : (
                      "My Profile"
                    )}
                  </Link>
                  <Link
                    className={linkClasses("bookings")}
                    to={"/account/bookings"}
                    onClick={closeDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    My Bookings
                  </Link>
                  <Link
                    className={linkClasses("places")}
                    to={"/account/places"}
                    onClick={closeDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.47 3.841a.75.75 0 1 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    <div
                      className="truncate overflow-hidden"
                      style={{ maxHeight: "2.5rem" }}
                    >
                      My Accommodations
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </Link>

          {/* <div
            className="hidden md:flex lg:flex cursor-pointer gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500"
            onClick={toggleTheme}
          >
            {isSunClicked ? (
              <div className="sun">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </div>
            ) : (
              <div className="moon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </div>
            )}
          </div> */}
          {!!user && (
            <div className="hidden md:flex lg:flex gap-2 font-semibold border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-500 cursor-pointer">
              <Link to={"/account/places/new"}>Airbnb your home...</Link>
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
          )}

          {!!user && (
            <div className="md:flex sm:flex gap-2 font-semibold border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-400 truncate">
              {user.username}
            </div>
          )}
        </header>
      </div>
      {/* <hr className="mt-2 border-t-2 border-gray-300" /> */}
    </>
  );
};

export default NavbarPage;
