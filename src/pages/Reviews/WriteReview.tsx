import React, { useState } from "react";
import PageDetail from "../../components/PageAlert/PageDetail";
import "./Review.css";

const review = "Write Review";

function WriteReview() {
  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState<File[]>([]); // For storing selected photos
  const [isPreview, setIsPreview] = useState(false); // Toggle between form and preview

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleReviewChange = (e) => setReviewText(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files) as File[];
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && reviewText && name && email) {
      setIsPreview(true); // Switch to preview mode
    } else {
      console.log("Please fill out all fields");
    }
  };

  const handleAddToDB = () => {
    // Here you’d call an API to store the review in the database
    console.log("Adding to DB:", {
      title,
      reviewText,
      name,
      email,
      photos,
    });
    // Reset form and preview after submission (optional)
    setTitle("");
    setReviewText("");
    setName("");
    setEmail("");
    setPhotos([]);
    setIsPreview(false);
  };

  const handleEdit = () => {
    setIsPreview(false); // Return to form mode for editing
  };

  return (
    <div className="home-container write-review-container">
      <PageDetail page={review} />
      <div className="review-form min-h-screen">
        {!isPreview ? (
          // Form Mode
          <>
            <div className="form-group">
              <label>Review Title</label>
              <input
                type="text"
                placeholder="Give your review a title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="form-group">
              <label>Review</label>
              <textarea
                placeholder="Write your comments here"
                value={reviewText}
                onChange={handleReviewChange}
              />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name (public)"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email (private)"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="button-group">
              <label className="photo-button">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoAdd}
                  style={{ display: "none" }}
                />
                <span>📷 Add Photos ({photos.length})</span>
              </label>
              <button className="submit-button" onClick={handleSubmit}>
                Preview
              </button>
            </div>
          </>
        ) : (
          // Preview Mode
          <div className="review-preview">
            <h2 className="preview-title">{title}</h2>
            <p className="preview-text">{reviewText}</p>
            <p className="preview-name">By: {name}</p>
            {photos.length > 0 && (
              <div className="preview-photos">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Review Photo ${index + 1}`}
                    className="preview-photo"
                  />
                ))}
              </div>
            )}
            <div className="button-group">
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
              <button className="submit-button" onClick={handleAddToDB}>
                Add to Database
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteReview;
