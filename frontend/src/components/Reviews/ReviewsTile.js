import React from "react";
import { Link } from "react-router-dom";
import ReviewFormComponent from "./ReviewFormComponent";
import { useSelector } from "react-redux";

const ReviewsTile = ({ review, isManage }) => {
    const date = new Date(review.createdAt);
    const spot = useSelector((state) => state.selectedSpot);
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="reviews-tile">
            <h3 className="reviews-tile-name">
                {review.Spot?.name ? (
                    <Link to={`/spots/${review.spotId}`}>{review.Spot.name}</Link>
                ) : (
                    review.User.firstName
                )}
            </h3>
            <p className="revies-tile-date">{`${date.toLocaleString("default", {
                month: "long",
            })} ${date.getFullYear()}`}</p>
            <p className="reviews-tile-review">{review.review}</p>


        </div>
    );
};

export default ReviewsTile;