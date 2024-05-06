import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";

const LoginCom = () => {
  const [redirect, setRedirect] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { storeTokenInLS, API, storeUserDataInLS } = useAuth();
  const URL = `${API}/api/auth/login`;

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(credentials);
  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     });
  //     console.log("Login form", response);
  //     if (response.ok) {
  //       const userData = await response.json(); // Extract JSON data from the response
  //       console.log("Response from database...", userData);
  //       toast.success("Logged in successfully...");
  //       storeTokenInLS(userData.token);
  //       storeUserDataInLS(userData);
  //       setRedirect(true);
  //       setCredentials({
  //         email: "",
  //         password: "",
  //       });
  //     } else {
  //       toast.error("Logged in failed!...");
  //       console.log("Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    // Check if email or password is empty
    if (!credentials.email || !credentials.password) {
      toast.warning("Please fill in all fields...");
      return;
    }
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log("Login form", response);
      if (response.ok) {
        const userData = await response.json(); // Extract JSON data from the response
        console.log("Response from database...", userData);
        toast.success("Logged in successfully...");
        storeTokenInLS(userData.token);
        // Store only the necessary user data in localStorage
        const { _id, username, email, isAdmin, phone } = userData.userData;
        storeUserDataInLS(
          JSON.stringify({ _id, username, email, isAdmin, phone })
        );
        setRedirect(true);
        setCredentials({
          email: "",
          password: "",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Logged in failed!...");
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSocialLogin = () => {
    toast.warning("Currently not working...");
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen lg:bg-gray-100 md:bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
        {/* Left side - Security image */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=900&t=st=1711897760~exp=1711898360~hmac=e48e4251d9c6974dbe476ca3789f8617340403c1c9b337c758e999d003c552cd"
            alt="Security Image"
            className="max-w-xs"
          />
        </div>
        {/* Right side - Login form */}
        <div className="lg:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4 underline">Login...</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative z-0">
              <input
                type="email"
                name="email"
                id="floating_standard_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={credentials.email}
                onChange={handleInputs}
              />
              <label
                htmlFor="floating_standard_email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email...
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="password"
                name="password"
                id="floating_standard_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={credentials.password}
                onChange={handleInputs}
              />
              <label
                htmlFor="floating_standard_password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Password...
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white  hover:bg-gray-300  text-black font-bold py-2 rounded mt-2 flex justify-center gap-2 border border-gray-500"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center">
            <div className="border-b border-gray-400 w-1/4"></div>
            <div className="mx-3 text-gray-800">or</div>
            <div className="border-b border-gray-400 w-1/4"></div>
          </div>
          <button
            type="button"
            className="w-full bg-white  hover:bg-gray-300  text-black font-bold py-2 rounded mt-2 flex justify-center gap-2 border border-gray-500"
            onClick={handleSocialLogin}
          >
            Continue with Google
            {/* <svg
              className="ml-2 w-6 h-6 text-white font-semibold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg> */}
            <img
              src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
              className="w-6 h-6"
              alt="Google_Img"
            />
          </button>
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded mt-2 flex justify-center gap-2 border border-gray-500"
            onClick={handleSocialLogin}
          >
            Continue with GitHub
            {/* <svg
              className="ml-2 w-6 h-6 text-white font-semibold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg> */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              className="w-6 h-6"
              alt="Githum_Img"
            />
          </button>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to={"/signup"} className="font-bold underline text-red-500">
              Sign up...
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCom;
