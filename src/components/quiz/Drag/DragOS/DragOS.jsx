import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db";
import "./DragOS.css";

const DragOS = ({ next, back, docId }) => {
  const osOptions = ["Android", "iOS", "HarmonyOS", "Other"];
  const [selectedOS, setSelectedOS] = useState("");
  const [otherInput, setOtherInput] = useState(""); // New state to track text input

  const handleSelect = (os) => {
    setSelectedOS(os);
    if (os !== "Other") {
      setOtherInput(""); // Clear input if "Other" is not selected
    }
  };

  const handleNext = async () => {
    if (selectedOS) {
      try {
        const docRef = doc(db, "surveyResponses", docId);

        // If "Other" is selected and input is provided, save both
        // Otherwise, just save "Other" without the input
        const osData =
          selectedOS === "Other" && otherInput
            ? `${selectedOS}: ${otherInput}`
            : selectedOS;

        await updateDoc(docRef, {
          OS: osData,
        });

        next();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  return (
    <>
      <h2>Let's start customizing your new phone!</h2>
      <hr />
      <p className="subtitle">
        <strong>What OS would you like to use?</strong>
      </p>
      <ul>
        {osOptions.map((os, id) => (
          <li
            key={id}
            className={`os-answer ${selectedOS === os ? "selected" : ""}`}
            onClick={() => handleSelect(os)}
          >
            {os}
          </li>
        ))}
      </ul>
      {selectedOS === "Other" && (
        <textarea
          className="open-answer other"
          placeholder="Enter the OS you would like to use"
          value={otherInput}
          onChange={(e) => setOtherInput(e.target.value)} // Track input value
        />
      )}

      <div className="buttons-container">
        <button className="next-button back" onClick={back}>
          <p>Back</p>
        </button>
        <button
          className="back-next-button"
          onClick={handleNext}
          disabled={!selectedOS}
        >
          <p>Next</p>
        </button>
      </div>
    </>
  );
};

export default DragOS;
