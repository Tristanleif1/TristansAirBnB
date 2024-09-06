import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import "./DeleteReviewModal.css"
// import { closeModal } from '../../context/Modal';


const DeleteReview = ( { closeModal, reviewId} ) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteReview(reviewId));
        closeModal();
    }

    return (
        <div className="delete-rating-container">
            <h2>Confirm Delete</h2>
            <p className="delete-review-text">Are you sure you want to delete this review?</p>
            <button className="delete-review-button"onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="cancel-review-button" onClick={{closeModal}}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReview;
