import { csrfFetch } from "./csrf";
const LOAD_REVIEWS ='reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';


const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});


export const loadSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if(response.ok){
        const data = await response.json();
        const reviews = data.Reviews;
        dispatch(loadReviews(reviews));
    }
};

export const createReview = (review, spotId) => async (dispatch) => {
            const {rating, comment} = review;
            const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ rating, comment})
            });
            if (response.ok){
                const newReview = await response.json();
                dispatch(addReview(newReview))
            }
};


const initialState = { list: [] };


export const reviewsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_REVIEWS: {
            const allReviews = {};
            action.reviews.forEach((review) => {
                allReviews[review.id] = review
            });
            return {
                ...state,
                ...allReviews,
                list: action.reviews
            };
        }
        case ADD_REVIEW: {
            const newState = {
                ...state,
                [action.review.id]: action.review
            };
            newState.list.push(action.review);
            return newState
        }
        default:
            return state
    }
}
