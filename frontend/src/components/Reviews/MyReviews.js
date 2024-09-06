import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, loadUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { NavLink, Link } from "react-router-dom";
import ReviewForm from "./ReviewFormComponent";
import { useModal } from "../../context/Modal";
import  { updatedReview } from "../../store/reviews";
import DeleteReview from "./DeleteReviewModal";
import "./MyReviews.css"

const MyReviews = () => {
    const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector((state) => state.reviews.list);
    const loading = useSelector((state) => state.reviews.loading);
    const dispatch = useDispatch();

    // const [showModal, setShowModal] = useState(false)
    const { setModalContent, closeModal } = useModal()
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        dispatch(loadUserReviews())
    }, [dispatch])


    if (loading) {
        return <div>Loading...</div>
    }

    if (reviews.length === 0) {
        return <div>No reviews yet!</div>
    }

    const updateClick = (review) => {
        setModalContent(
            <ReviewForm spotId={review.spotId}
                initialReview={review.review}
                initialStars={review.stars}
                reviewId={review.id}
                closeModal={closeModal}
                onSubmit={(updatedReviewData) => {
                    dispatch(updatedReview(updatedReviewData, review.id, review.spotId));
                    closeModal()
                }}
            />
        )
        // setSelectedReview(review)
        // setShowModal(true)
    }

    return (
        <div className="my-reviews-container">
            <h1>My Reviews</h1>
            <div className="my-reviews">
                {reviews?.map((review) => {

                    const reviewDate = new Date(review.createdAt).toLocaleDateString();
                    return (
                        <li className="individual-review" key={review.id}>
                            <Link className="spot-review-link" exact to={`/spots/${review.spotId}`}>
                                <p>{reviewDate}</p>
                                <h2 className="review-name">
                                    {review.Spot?.name}
                                </h2>
                            </Link>
                            <p>{review.review}</p>
                            <p>Rating: {review.stars}</p>
                            <div className="individual-review-options">
                                <button className="button-modal" onClick={() => updateClick(review)}>Update</button>
                                <button onClick={() => setModalContent(
                                    <DeleteReview
                                    reviewId={review.id}
                                    closeModal={closeModal}
                                    />
                                )} className="button-modal">Delete</button>
                            </div>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default MyReviews