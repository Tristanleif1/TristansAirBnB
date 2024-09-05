import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loadSpotReviews } from "../../store/reviews";
import { updatedReview } from "../../store/reviews";
import { createReview } from "../../store/reviews";
import "./ReviewSpotModal.css"

const ReviewForm = ({ spotId, reviewId = null, initialReview = "", initialStars = 0, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [reviewText, setReviewText] = useState(initialReview);
  const [stars, setStars] = useState(initialStars);
  // const [activeStars, setActiveStars] = useState(stars);
  const [starRating, setStarRating] = useState(0);
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setReviewText("");
    setStarRating("");
    setErrors("");
  };

 useEffect(() => {
    return resetForm
 }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      review: reviewText,
      stars: stars,
    };

    try {
      let response;

      if (reviewId) {
        
        response = await dispatch(updatedReview(requestBody, reviewId, spotId));
      } else {
        response = await dispatch(createReview(requestBody, spotId));
      }

      if (!response) {
        console.error("Failed to submit review");
        return;
      }

      await dispatch(loadSpotReviews(spotId)); 
      closeModal();
      history.push(`/spots/${spotId}`);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } 
  };
  return (
    <div className="rating-modal-container">
      <h2>{reviewId ? "Edit Your Review" : "How was your stay?"}</h2>
      <form className="rating-modal-form" onSubmit={handleSubmit}>
          {errors && <p>{errors}</p>}
        <textarea
          className="review-text-area"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Leave your review here..."
        />
        <div className="rating-input">
          <div onMouseEnter={() => setStars(1)}
               onMouseLeave={() => setStars(stars)}
               onClick={() => setStars(1)}
          >
            <i
              className={`fa-star ${
                stars >= 1 ? "fa-solid" : "fa-regular"
              }`}
            ></i>
           </div>
           <div
            onMouseEnter={() => setStars(2)}
            onMouseLeave={() => setStars(stars)}
            onClick={() => setStars(2)}
          >
            <i
              className={`fa-star ${
                stars >= 2 ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </div>
          <div
            onMouseEnter={() => setStars(3)}
            onMouseLeave={() => setStars(stars)}
            onClick={() => setStars(3)}
          >
            <i
              className={`fa-star ${
                stars >= 3 ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </div>
          <div
            onMouseEnter={() => setStars(4)}
            onMouseLeave={() => setStars(stars)}
            onClick={() => setStars(4)}
          >
            <i
              className={`fa-star ${
                stars >= 4 ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </div>
          <div
            onMouseEnter={() => setStars(5)}
            onMouseLeave={() => setStars(stars)}
            onClick={() => setStars(5)}
          >
            <i
              className={`fa-star ${
                stars >= 5 ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </div>
          <p>Stars</p>
        </div>
        <button type="submit" className="review-submit-button" disabled={reviewText.length < 10 || stars < 1}>
          {reviewId ? "Update Your Review" : "Submit Your Review"}
        </button>
        <button type="button" className="cancel-review-button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
