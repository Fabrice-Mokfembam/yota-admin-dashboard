import React from "react";
import { FaStar } from "react-icons/fa";
import { format as timeAgo } from "timeago.js";
import moment from "moment";

const ReviewCard = ({ review }) => {

  return (
    <div className="bg-white w-80 rounded-lg shadow-md p-4 flex mt-4 flex-col gap-2 items-center">
      <img
        src={review.photos}
        alt="Review"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex items-center gap-1">
           <FaStar/>
           <FaStar/>
           <FaStar/>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{review.title}</h3>
      <p className="text-gray-600 text-sm text-center">{review.reviewText}</p>
      <p className="text-gray-500 text-sm">By: {review.name}</p>
      <p className="text-gray-400 text-xs"> 3/34/2022</p>
      {!review.confirmed && (
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition text-sm"
       
        >
          Confirm
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
