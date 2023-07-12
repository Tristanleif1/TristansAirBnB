import React from "react";

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>{message}</p>
      <button onClick={onConfirm} style={{ backgroundColor: 'red' }}>Yes (Delete Spot)</button>
      <button onClick={onCancel} style={{ backgroundColor: 'darkgrey' }}>No (Keep Spot)</button>
    </div>
  );
}
