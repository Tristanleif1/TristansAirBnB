import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
// import { closeModal } from '../../context/Modal';


const DeleteReview = ( { closeModal, reviewId} ) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteReview(reviewId));
        closeModal();
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete} style={{backgroundColor: 'red'}}>Yes (Delete Review)</button>
            <button onClick={{closeModal}} style={{backgroundColor: 'darkgrey'}}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReview;
