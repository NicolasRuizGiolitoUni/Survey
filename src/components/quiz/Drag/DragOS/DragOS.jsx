import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db";
import "./DragOS.css";

const DragOS = ({ next, back, docId }) => {
  const osOptions = ["Android", "iOS", "HarmonyOS", "Other"];
  const [selectedOS, setSelectedOS] = useState("");

  const handleSelect = (os) => {
    setSelectedOS(os);
  };

  const handleNext = async () => {
    if (selectedOS) {
      try {
        const docRef = doc(db, "surveyResponses", docId);
        await updateDoc(docRef, {
          OS: selectedOS,
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
      <hr></hr>
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
