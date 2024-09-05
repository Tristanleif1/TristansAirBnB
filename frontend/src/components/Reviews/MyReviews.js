import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { NavLink, Link } from "react-router-dom"
import "./MyReviews.css"

const MyReviews = () => {
    const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector((state) => state.reviews.list);
    const loading = useSelector((state) => state.reviews.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserReviews())
    }, [dispatch])


    if (loading) {
        return <div>Loading...</div>
    }

    if (reviews.length === 0) {
        return <div>No reviews yet!</div>
    }

    return (
        <div className="my-reviews-container">
            <h1>My Reviews</h1>
            <div className="my-reviews">
                {reviews?.map((review) => {

                    const reviewDate = new Date(review.createdAt).toLocaleDateString();
                    return (
                        <li className="individual-review" key={review.id}>
                            <Link className="spot-review-link" exact to={`/spot/${review.spotId}`}>
                                <p>{reviewDate}</p>
                                <h2 className="review-name">
                                    {review.Spot?.name}
                                </h2>
                            </Link>
                            <p>{review.review}</p>
                            <p>Rating: {review.stars}</p>
                            <div className="individual-review-options">
                                <button className="button-modal">Update</button>
                                <button className="button-modal">Delete</button>
                            </div>
                        </li>
                    )
                })}
                <div className="individual review container">
                    <h3></h3>
                </div>
            </div>
        </div>
    )
}

export default MyReviews