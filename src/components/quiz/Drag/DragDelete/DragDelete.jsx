import React, { useState } from "react";
import "./DragDelete.css";
import DragModal from "../DragModal/DragModal";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db";

const DragDelete = ({
  next,
  apps,
  setApps,
  trashApps,
  setTrashApps,
  docId,
}) => {
  const [showNextButtonMessage, setShowNextButtonMessage] = useState(""); // State for Next button message
  const appCount = apps.length; // Track the number of apps
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppName, setSelectedAppName] = useState(null);

  const openModal = (appName) => {
    if (apps.length === 1) {
      setShowNextButtonMessage("You must have at least 1 app.");
      setTimeout(() => {
        setShowNextButtonMessage(""); // Hide the message after 3 seconds
      }, 3000);
    } else {
      setSelectedAppName(appName);
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (reason) => {
    // Remove the selected app from the apps array
    const updatedApps = apps.filter((app) => app.name !== selectedAppName);
    setApps(updatedApps);

    // Add the deleted app and reason to the trashApps array
    const updatedTrashApps = [...trashApps, { name: selectedAppName, reason }];
    setTrashApps(updatedTrashApps);

    // Save the deleted apps and reasons to Firestore
    await saveDeletedAppsToFirestore(updatedTrashApps);

    // Close the modal
    setModalIsOpen(false);
  };

  const saveDeletedAppsToFirestore = async (deletedApps) => {
    try {
      const docRef = doc(db, "surveyResponses", docId);
      await updateDoc(docRef, { Deleted_apps: deletedApps });
      console.log("Deleted apps saved to Firestore:", deletedApps);
    } catch (error) {
      console.error("Error updating deleted apps:", error);
    }
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
        Press on the delete icon until <strong>5 apps </strong> remain. What
        apps are truly important to you?
      </p>

      <div id="apps-delete" className="apps-container">
        {apps.map((app, index) => (
          <div className="app-item" key={app.id}>
            <div className="app-name">
              {index + 1}. {app.name}
            </div>

            <span
              onClick={() => openModal(app.name)}
              className="material-symbols-outlined trash"
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
          onDelete={handleDelete} // Pass the delete handler to the modal
        />
      )}
    </>
  );
};

export default DragDelete;
