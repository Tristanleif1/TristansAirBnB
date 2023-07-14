import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loadSpotReviews } from "../../store/reviews";
import { createReview } from "../../store/reviews";

const ReviewForm = ({ spotId, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [reviewText, setReviewText] = useState("");
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
      stars: starRating,
    };

    try {
        const createdReview = await dispatch(createReview(requestBody, spotId));

        if (!createdReview) {
          // In case the review is not created, log the error and stop execution
          console.error('Failed to create review');
          return;
        }

        const loadedReviews = await dispatch(loadSpotReviews(spotId));

        // Log the loaded reviews to check if they contain the newly created one
        console.log(loadedReviews);

        closeModal();
        history.push(`/spots/${spotId}`);
      } catch (error) {
        console.error('Failed to create review:', error);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
        {errors && <p>{errors}</p>}
      <h2>How was your stay?</h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Leave your review here..."
      />
      <div>
        <label>Stars</label>
        <input
          type="number"
          min="1"
          max="5"
          value={starRating}
          onChange={(e) => setStarRating(e.target.value)}
        />
      </div>
      <button type="submit" disabled={reviewText.length < 10 || starRating < 1}>
        Submit Your Review
      </button>
      <button type="button" onClick={closeModal}>
        Cancel
      </button>
    </form>
  );
};

export default ReviewForm;
