import React, { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragChosen.css";

const DragChosen = ({ apps, setApps, docId, next }) => {
  const [chooseReason, setChooseReason] = useState(""); // State to store the reason
  const [showMessage, setShowMessage] = useState("");

  // Handle change in reason input
  const handleChangeReason = (e) => {
    setChooseReason(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (chooseReason === "") {
      setShowMessage("Please enter a reason.");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    try {
      const docRef = doc(db, "surveyResponses", docId);

      // Create an object with all the chosen app names and the reason
      const finalChosenApps = {
        apps: apps.map((app) => app.name), // Array of app names
        reason: chooseReason, // The reason for all apps
      };

      // Save the structure in Firestore
      await updateDoc(docRef, {
        finalChosenApps: finalChosenApps,
      });

      // Log the updated document (optional)
      const updatedDoc = await getDoc(docRef);
      console.log("Updated document:", updatedDoc.data());

      setShowMessage("Submitted successfully!");
      setTimeout(() => setShowMessage(""), 3000);

      // Move to the next step
      next();
    } catch (error) {
      console.error("Error updating document:", error);
      setShowMessage("Failed to submit. Try again.");
      setTimeout(() => setShowMessage(""), 3000);
    }
  };

  return (
    <>
      <h2 className="title">Your new phone is almost ready to use!</h2>
      <hr />
      <p className="paragraph">
        Tell us why these are the most important apps for you.{" "}
        <strong>
          Why do you think you can't live without them? What value do they offer
          you?
        </strong>
      </p>

      <textarea
        placeholder="Enter your reason."
        id="reason"
        value={chooseReason}
        onChange={handleChangeReason}
        className="reason-input"
      ></textarea>

      <button
        className={`add-button ${!chooseReason.trim() ? "disabled" : ""}`} // Disable the button if no reason is entered
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Display chosen apps */}
      <div id="apps-chosen" className="apps-container">
        {apps.map((app, index) => (
          <div className="app-item" key={app.id}>
            <div className="app-name">
              {index + 1}. {app.name}
            </div>
          </div>
        ))}
      </div>

      {showMessage && <div className="message">{showMessage}</div>}
    </>
  );
};

export default DragChosen;
