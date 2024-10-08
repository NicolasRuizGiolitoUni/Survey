import React from "react";
import Modal from "react-modal";
import "./DragModal.css";

const DragModal = ({ appName, setModalIsOpen, onRequestClose }) => {
  const handleConfirmDelete = () => {
    // Perform delete logic here
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
      <p>
        Are you sure you want to delete <strong>{appName}</strong>?
      </p>
      <div className="modal-buttons">
        <button onClick={handleConfirmDelete} className="delete-button">
          Confirm Delete
        </button>
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DragModal;
