import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
import AccountCom from "./AccountCom";
import PlacesCom from "./PlacesCom";
import LoadingCom from "./LoadingCom";

function ProfileCom() {
  const [redirect, setRedirect] = useState(null);
  const { user, LogoutUser, setUser, readyData, API } = useAuth();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!readyData) {
    return <LoadingCom />;
  }
  if (readyData && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // console.log(user);
  const handleLogout = () => {
    toast.success("Logged out successfully!...");
    LogoutUser();
    setRedirect("/");
    setUser("");
  };

  const checkAdminIs = () => {
    toast.info("You're not an admin!");
  };

  return (
    <>
      <div>
        <AccountCom />
        {subpage === "profile" && (
          <div className="flex justify-center items-center h-full lg:mt-8 md:mt-6 sm:mt-3 mb-3">
            <div className="bg-white shadow-md border border-gray-300 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl text-center font-bold mb-4 underline">
                User Profile...
              </h2>
              <div className="flex justify-center overflow-hidden">
                <div className="w-12 h-12 bg-gray-300 overflow-hidden rounded-full">
                  <img
                    className="object-cover w-full h-full"
                    src={
                      user?.profilePic ||
                      "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png"
                    }
                    alt="userImage"
                  />
                </div>
              </div>
              <hr className="mt-2 mb-2 border-t-2 border-gray-300" />
              <div className="flex items-center gap-2 font-semibold">
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <p className="text-gray-900 gap-2">Username: {user.username}</p>
              </div>
              <div className="flex items-center font-semibold gap-2">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <p className="text-gray-900 gap-2 mt-1">Email: {user.email}</p>
              </div>
              <div className="flex items-center font-semibold gap-2">
                {user.phone ? (
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                ) : (
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
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                )}

                <p className="text-gray-900 gap-2 mt-1">
                  {user.phone ? `Phone: ${user.phone}` : `UserId: ${user.sub}`}
                </p>
              </div>
              <div className="flex items-center font-semibold gap-2">
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
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

                <p className="text-gray-900 gap-2 mt-1">
                  Admin: {user.isAdmin ? "Yes" : "No"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded-md block w-full text-center"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {subpage === "places" && (
          <div>
            <PlacesCom />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center h-full lg:mt-3 md:mt-3 sm:mt-3">
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-6 w-full max-w-md">
          <h2 className="lg:text-xl sm:text-sm font-semibold mb-4 underline flex justify-center">
            <Link to={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </Link>
            Check if you are an admin...?
          </h2>
          <Link
            className="mt-4 bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded-md block w-full gap-3 justify-center flex"
            to={user.isAdmin ? "/admin" : ""}
            onClick={() => (user.isAdmin ? "" : checkAdminIs())}
          >
            Check Admin DashBoard
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
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProfileCom;
