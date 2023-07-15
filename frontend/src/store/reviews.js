import { csrfFetch } from "./csrf";
import { loadSingleSpot } from "./spots";
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const SET_LOADING = "reviews/SET_LOADING";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(removeReview(reviewId));
    dispatch(loadSingleSpot(review.spotId));
    return;
  }
  throw new Error("Could not delete review");
};

export const loadSpotReviews = (spotId) => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    const reviews = data.Reviews.map((review) => ({
      ...review,
      User: review.User,
    }));
    dispatch(loadReviews(reviews));
    dispatch(setLoading(false));
  } else {
    console.error("Failed to load reviews for spot", spotId);
    dispatch(setLoading(false));
  }
};

export const createReview = (review, spotId) => async (dispatch) => {
  const { review: comment, stars: rating } = review;

  console.log(
    "Sending review:",
    JSON.stringify({ review: comment, stars: rating })
  );

  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: comment, stars: rating }),
    });

    console.log("Server response:", response);

    if (!response.ok) {
      throw response;
    }

    const newReview = await response.json();
    dispatch(addReview(newReview));
    dispatch(loadSingleSpot(newReview.spotId));
    return newReview;
  } catch (error) {
    console.error("Error during review creation:", error);

    if (error.json) {
      error.json().then((data) => {
        console.error("Server response data:", data);
      });
    }

    throw new Error("Failed to create review");
  }
};

const initialState = { list: [], loading: false };

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const allReviews = {};
      action.reviews.forEach((review) => {
        allReviews[review.id] = review;
      });
      return {
        ...state,
        ...allReviews,
        list: action.reviews,
      };
    }
    case ADD_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review,
        list: [action.review, ...state.list],
      };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      const reviewList = newState.list.filter(
        (review) => review.id !== action.reviewId
      );
      newState.list = reviewList;
      return newState;
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    default:
      return state;
  }
};
