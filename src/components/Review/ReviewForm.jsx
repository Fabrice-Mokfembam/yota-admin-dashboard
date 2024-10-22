import { useState } from "react";
import "./ReviewForm.css";
import {  FaTimes } from "react-icons/fa";

const ReviewForm = ({ submitReview, setShowReviewForm }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add logic to send the review to your DB
    submitReview({ name, rating, reviewText });

    // Clear form fields
    setName("");
    setRating("");
    setReviewText("");
  };

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h2>Write a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="1"
          max="5"
        />
        <textarea
          placeholder="Your Review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
        <button className="cancelbtn" onClick={() => setShowReviewForm(false)}>
          <FaTimes /> {/* Cancel button to close form */}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
