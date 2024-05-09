import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";

const ReviewListCom = ({ reviews, onDelete }) => {
  const { token, API, user } = useAuth();
  const [reviewDeleted, setReviewDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete review...");
      }

      setReviewDeleted(true);
      onDelete(id);
      setTimeout(() => {
        setReviewDeleted(false);
        window.location.reload();
        toast.success("Review deleted successfully...");
      }, 1000);
    } catch (error) {
      toast.error("You are not authorized to delete this review...");
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="bg-gray-100 py-4 px-6">
      {reviews.length > 0 && (
        <div className="ml-2 w-44 bg-white p-2 rounded-2xl font-bold mt-2 ml-2 shadow-md shadow-gray-700 mb-2 cursor-pointer">
          Show all {reviews.length} reviews...
        </div>
        // <h3 className="text-lg font-semibold mb-4">
        // </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-md sm:col-span-1 relative"
          >
            <button
              onClick={() => handleDelete(review._id)}
              className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <div className="items-center mb-2">
              <div className="flex items-center mb-1">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-2">
                  <img
                    className="object-cover w-full h-full"
                    src={
                      user.ProfilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAThX1-PzXi-U2MgsvbWm3KzM3avYeWewkg&usqp=CAU"
                    }
                    alt="userImage"
                  />
                </div>
                <h2 className="font-semibold mr-2 mb-2">{review.userName}</h2>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mr-1">
                    {index < review.rating ? (
                      <AiFillStar className="text-yellow-500" />
                    ) : (
                      <AiOutlineStar className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              Created At: &nbsp;
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
      {reviewDeleted && (
        <div className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full text-sm">
          Review Deleted Successfully
        </div>
      )}
    </div>
  );
};

export default ReviewListCom;
