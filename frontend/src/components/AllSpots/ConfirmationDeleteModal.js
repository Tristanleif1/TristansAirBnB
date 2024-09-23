import React from "react";
import "./DeleteSpotConfirmation.css";
import { deleteSpot } from "../../store/spots";
import { useDispatch } from "react-redux";



export default function ConfirmationModal({ message, closeModal, onConfirm, onCancel, spotId}) {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteSpot(spotId));
    closeModal()
  }
  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      <p className="delete-spot-text">{message}</p>
      <button className="delete-spot-button" onClick={handleDelete}>Yes (Delete Spot)</button>
      <button className="cancel-spot-button"onClick={closeModal}>No (Keep Spot)</button>
    </div>
  );
}
