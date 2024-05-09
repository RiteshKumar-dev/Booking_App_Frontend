import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
// import { GoogleLogin } from "react-google-login";
const clientId =
  "1065221343853-uc79uql8hsn3bi25duumj2dnftbu1pam.apps.googleusercontent.com";
const SignupCom = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS, API, storeUserDataInLS } = useAuth();
  const URL = `${API}/api/auth/signup`;

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // Check if signup form is empty
    if (!user.username || !user.email || !user.phone || !user.password) {
      toast.warning("Please fill in all fields...");
      return;
    }
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Response from database...", userData);
        storeTokenInLS(userData.token); // Store token in localStorage
        const { _id, username, email, isAdmin, phone } = userData.userData;
        storeUserDataInLS(
          JSON.stringify({ _id, username, email, isAdmin, phone })
        );
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful...");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        navigate("/");
      } else {
        console.log(response);
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.log("Registration error", error);
      toast.error("Registration failed...");
    }
  };
  const handleSocialLoginSuccess = async (response) => {
    try {
      const tokenId = response.tokenId;
      const responseBackend = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId }),
      });

      if (responseBackend.ok) {
        const userData = await responseBackend.json();
        console.log("Signup form se :", userData.userData);
        console.log("Signup form se :", userData.token);
        toast.success("Registration successful...");
        storeTokenInLS(userData.token);
        const { _id, username, email, isAdmin, sub, profilePic } =
          userData.userData;
        storeUserDataInLS(
          JSON.stringify({ _id, username, email, isAdmin, sub, profilePic })
        );

        setTimeout(() => {
          window.location.reload();
        }, 500);
        navigate("/");
      } else {
        toast.error("Signup failed!...");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSocialLoginFailure = (response) => {
    console.error("Signup Error:", response);
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:bg-gray-100 md:bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
        {/* Right side - Login form */}
        <div className="lg:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4 underline">Signup...</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative z-0">
              <input
                type="text"
                name="username"
                id="floating_standard_text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={user.username}
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
                value={user.email}
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
                type="tel"
                name="phone"
                id="floating_standard_tel"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={user.phone}
                onChange={handleInputs}
              />
              <label
                htmlFor="floating_standard_tel"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Phone...
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="password"
                name="password"
                id="floating_standard_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={user.password}
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
              disabled={
                !user.username || !user.email || !user.phone || !user.password
              }
            >
              Register
            </button>
          </form>
          <div className="flex items-center justify-center">
            <div className="border-b border-gray-400 w-1/4"></div>
            <div className="mx-3 text-gray-800">or</div>
            <div className="border-b border-gray-400 w-1/4"></div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/react-google-login"></script>

          <GoogleLogin
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={handleSocialLoginSuccess}
            onFailure={handleSocialLoginFailure}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                type="button"
                className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded mt-2 flex justify-center gap-2 border border-gray-500"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Continue with Google
                <img
                  src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-google-logo-vector-png-image_12256710.png"
                  className="w-7 h-7"
                  alt="Google_Img"
                />
              </button>
            )}
          />
          <p className="text-center mt-4">
            Already have an account?
            <Link to={"/login"} className="font-bold underline text-red-500">
              Login...
            </Link>
          </p>
        </div>
        {/* Left side - Security image */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1711900907~exp=1711904507~hmac=7fb9197176fd364979cb3e09ea6ae8e35922c85edf3e22dcb6bacde07e83a77d&w=740"
            alt="Security Image"
            className="max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupCom;
