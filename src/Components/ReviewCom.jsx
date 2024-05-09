import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import ReviewListCom from "./ReviewListCom";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ReviewCom = ({ place }) => {
  const { user, token, API } = useAuth();
  const [userName, setUserName] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      setUserName(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/api/reviews`,
        {
          userName,
          email,
          rating,
          comment,
          place: place._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      toast.success("Review Submitted...");
      setReviews([...reviews, data]);
      setUserName("");
      setEmail("");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review...");
      console.error("Error submitting review:", error);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API}/api/reviews/place/${place._id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [place]);

  const handleDeleteReview = async (id) => {
    try {
      const response = await axios.delete(`${API}/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setReviews(reviews.filter((review) => review._id !== id));
        toast.success("Review Deleted...");
      } else {
        throw new Error("You are not authorized to delete this review...");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("You are not authorized to delete this review...");
    }
  };
  const handleSubmitBtn = () => {
    if (!userName || !email || !rating || !comment) {
      return toast.warning("Fill all the fields properly...");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-5 lg:bg-gray-100 md:bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
          {/* Left side - Security image */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img
              src="https://img.freepik.com/premium-vector/customer-filling-out-feedback-form_11197-447.jpg?w=740"
              alt="Security Image"
              className="max-w-xs"
            />
          </div>
          {/* Right side - Login form */}
          <div className="lg:w-1/2 bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 underline">
              Leave a Review...
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative z-0">
                <input
                  type="email"
                  name="email"
                  id="floating_standard_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  type="text"
                  name="username"
                  id="floating_standard_username"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label
                  htmlFor="floating_standard_password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Username...
                </label>
              </div>
              <label className="block mt-4">
                Rating:
                <div className="flex justify-between mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      className="flex items-center cursor-pointer"
                      onClick={() => handleStarClick(value)}
                      style={{ transition: "transform 0.2s" }}
                    >
                      {value <= rating ? (
                        <AiFillStar
                          className="text-5xl text-yellow-500"
                          style={{ transform: "scale(1.2)" }}
                        />
                      ) : (
                        <AiOutlineStar
                          className="text-5xl text-gray-400"
                          style={{ transform: "scale(1)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </label>
              <label className="block mt-4">
                Review:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </label>
              <button
                type="submit"
                className="mt-6 w-full bg-red-500 border border-transparent rounded-2xl py-2 px-4 inline-flex justify-center text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                // disabled={!userName || !rating || !comment}
                onClick={handleSubmitBtn}
              >
                Submit Review
              </button>
            </form>
            {/* <div className="flex items-center justify-center">
            <div className="border-b border-gray-400 w-1/4"></div>
            <div className="mx-3 text-gray-800">or</div>
            <div className="border-b border-gray-400 w-1/4"></div>
          </div>
          <button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded mt-2 flex justify-center"
            onClick={handleSocialLogin}
          >
            Login with Google
            <svg
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
            </svg>
          </button>
          <button
            type="button"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded mt-2 flex justify-center"
            onClick={handleSocialLogin}
          >
            Login with GitHub
            <svg
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
            </svg>
          </button> */}
            <p className="text-center mt-4">
              Don't have an account?
              <Link to={"/signup"} className="font-bold underline text-red-500">
                Sign up...
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <ReviewListCom reviews={reviews} onDelete={handleDeleteReview} />
      </div>
    </>
  );
};

export default ReviewCom;

// import React, { useState, useEffect } from "react";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import axios from "axios";
// import ReviewListCom from "./ReviewListCom";
// import { useAuth } from "../Context/authContext";
// import { toast } from "react-toastify";

// const ReviewCom = ({ place }) => {
//   const { user, token, API } = useAuth();
//   const [userName, setUserName] = useState(user ? user.username : "");
//   const [email, setEmail] = useState(user ? user.email : "");
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     if (user) {
//       setUserName(user.username);
//       setEmail(user.email);
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${API}/api/reviews`,
//         {
//           userName,
//           email,
//           rating,
//           comment,
//           place: place._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = response.data;
//       toast.success("Review Submitted...");
//       setReviews([...reviews, data]);
//       setUserName("");
//       setEmail("");
//       setRating(0);
//       setComment("");
//     } catch (error) {
//       toast.error("Failed to submit review...");
//       console.error("Error submitting review:", error);
//     }
//   };

//   const handleStarClick = (value) => {
//     setRating(value);
//   };

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `${API}/api/reviews/place/${place._id}`
//         );
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [place]);

//   const handleDeleteReview = async (id) => {
//     try {
//       const response = await axios.delete(`${API}/api/reviews/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete review");
//       }
//       toast.success("Review Deleted...");
//       setReviews(reviews.filter((review) => review._id !== id));
//     } catch (error) {
//       toast.error("Failed to delete review...");
//       console.error("Error deleting review:", error);
//     }
//   };
//   return (
//     <>
//       <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-3">
//         <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 py-4 px-6 flex">
//           Leave a Review...
//           <p className="text-red-500">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//               />
//             </svg>
//           </p>
//         </h2>
//         <form onSubmit={handleSubmit} className="p-6">
//           <label className="block">
//             Username:
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </label>
//           <label className="block mt-4">
//             Email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </label>
//           <label className="block mt-4">
//             Rating:
//             <div className="flex justify-between mt-2">
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <div
//                   key={value}
//                   className="flex items-center cursor-pointer"
//                   onClick={() => handleStarClick(value)}
//                   style={{ transition: "transform 0.2s" }}
//                 >
//                   {value <= rating ? (
//                     <AiFillStar
//                       className="text-5xl text-yellow-500"
//                       style={{ transform: "scale(1.2)" }}
//                     />
//                   ) : (
//                     <AiOutlineStar
//                       className="text-5xl text-gray-400"
//                       style={{ transform: "scale(1)" }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </label>
//           <label className="block mt-4">
//             Review:
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             className="mt-6 w-full bg-red-500 border border-transparent rounded-2xl py-2 px-4 inline-flex justify-center text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             disabled={!userName || !rating || !comment}
//           >
//             Submit Review
//           </button>
//         </form>
//       </div>
//       <div className="p-6">
//         <ReviewListCom reviews={reviews} onDelete={handleDeleteReview} />
//       </div>
//     </>
//   );
// };

// export default ReviewCom;
