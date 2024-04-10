import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";

const ReviewListCom = ({ reviews, onDelete }) => {
  const { token, API } = useAuth();
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
        throw new Error("Failed to delete review");
      }

      setReviewDeleted(true);
      onDelete(id);
      setTimeout(() => {
        setReviewDeleted(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete review...");
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="bg-gray-100 py-4 px-6">
      {reviews.length > 0 && (
        <h3 className="text-lg font-semibold mb-4">All Reviews</h3>
      )}
      <hr className="mb-2 border-t-2 border-gray-300" />
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
              Delete
            </button>
            <div className="items-center mb-2">
              <div className="flex items-center mb-1">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-2">
                  <img
                    className="object-cover w-full h-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAThX1-PzXi-U2MgsvbWm3KzM3avYeWewkg&usqp=CAU"
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
