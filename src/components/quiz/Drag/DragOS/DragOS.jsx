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
          os: selectedOS,
        });

        console.log("Selected OS:", selectedOS);
        console.log("Document ID:", docId);

        next();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  return (
    <>
      <h2 className="title">Let's start customizing your new phone!</h2>
      <hr></hr>
      <h2 className="title os">What OS would you like to use?</h2>
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
