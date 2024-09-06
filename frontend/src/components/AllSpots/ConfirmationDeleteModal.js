import React from "react";
import "./DeleteSpotConfirmation.css"

export default function ConfirmationModal({ message, closeModal, onConfirm, onCancel }) {
  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      <p className="delete-spot-text">{message}</p>
      <button className="delete-spot-button" onClick={onConfirm}>Yes (Delete Spot)</button>
      <button className="cancel-spot-button"onClick={{closeModal}}>No (Keep Spot)</button>
    </div>
  );
}
