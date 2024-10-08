import React, { useState } from "react";
import Modal from "react-modal";
import "./DragModal.css";

const DragModal = ({ appName, setModalIsOpen, onRequestClose, onDelete }) => {
  const [deleteReason, setDeleteReason] = useState(""); // State to hold the delete reason
  const [message, setMessage] = useState(""); // State to hold the error message

  const handleConfirmDelete = () => {
    if (deleteReason === "") {
      setMessage("Please enter a reason for deleting the app.");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
      return;
    }
    onDelete(deleteReason);
    setModalIsOpen(false); // Close the modal after deletion
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <h2>{appName}</h2>

      <textarea
        type="text"
        placeholder="Why do you want to delete this app?"
        className="delete-reason"
        value={deleteReason}
        onChange={(e) => setDeleteReason(e.target.value)} // Capture the reason
      />

      <div className="modal-buttons">
        <button onClick={handleConfirmDelete} className="delete-button-yes">
          Delete
        </button>
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>

      {message && <div className="message">{message}</div>}
    </Modal>
  );
};

export default DragModal;
