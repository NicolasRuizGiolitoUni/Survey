import React, { useState } from "react";
import "./DragDelete.css"; // Adjust the path as necessary
import DragModal from "../DragModal/DragModal";

const DragDelete = ({ next, apps }) => {
  const [showNextButtonMessage, setShowNextButtonMessage] = useState(""); // State for Next button message
  const appCount = apps.length; // Track the number of apps
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppName, setSelectedAppName] = useState(null);

  const openModal = (appName) => {
    setSelectedAppName(appName);
    setModalIsOpen(true);
  };

  const handleClickNext = () => {
    // Enforce that there must be at least 5 apps to proceed to the next screen
    if (appCount > 5) {
      setShowNextButtonMessage("Your storage is still full! Delete more apps.");
      setTimeout(() => {
        setShowNextButtonMessage(""); // Hide the message after 3 seconds
      }, 3000);
      return; // Exit the function early
    }

    next();
  };

  const isNextButtonDisabled = appCount > 5;

  return (
    <>
      <h2 className="title">Oops! Your storage is already full! {":("}</h2>
      <hr />
      <p className="paragraph">
        You need to delete apps until at least <strong>5 </strong>remain.
      </p>

      <div id="apps-delete" className="apps-container">
        {apps.map((app, index) => (
          <div className="app-item" key={app.id}>
            <div className="app-name">
              {index + 1}. {app.name}
            </div>

            <span
              onClick={() => openModal(app.name)}
              className="material-symbols-outlined"
            >
              delete
            </span>
          </div>
        ))}
      </div>

      <div className="buttons-container">
        <button
          className={`back-next-button ${
            isNextButtonDisabled ? "disabled" : ""
          }`}
          onClick={handleClickNext}
          disabled={isNextButtonDisabled}
        >
          <p>Next</p>
        </button>
      </div>

      {showNextButtonMessage && (
        <div className="message">{showNextButtonMessage}</div>
      )}

      {/** Modal for deleting apps */}
      {modalIsOpen && (
        <DragModal
          setModalIsOpen={setModalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          appName={selectedAppName}
        />
      )}
    </>
  );
};

export default DragDelete;
