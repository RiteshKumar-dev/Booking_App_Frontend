import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import ReviewListCom from "./ReviewListCom";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";

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

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      toast.success("Review Deleted...");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      toast.error("Failed to delete review...");
      console.error("Error deleting review:", error);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-3">
        <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 py-4 px-6 flex">
          Leave a Review...
          <p className="text-red-500">
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
          </p>
        </h2>
        <form onSubmit={handleSubmit} className="p-6">
          <label className="block">
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
          <label className="block mt-4">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
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
            disabled={!userName || !rating || !comment}
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="p-6">
        <ReviewListCom reviews={reviews} onDelete={handleDeleteReview} />
      </div>
    </>
  );
};

export default ReviewCom;
