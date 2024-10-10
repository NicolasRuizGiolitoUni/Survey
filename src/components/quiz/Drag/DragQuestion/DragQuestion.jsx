import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db";

function DragQuestion({ next, back, docId }) {
  const [answer, setAnswer] = useState("");

  const isButtonDisabled = answer.length === 0;

  const handleNext = async () => {
    if (isButtonDisabled) return;
    else {
      try {
        const docRef = doc(db, "surveyResponses", docId);
        await updateDoc(docRef, {
          Living_without_phone: answer,
        });

        next();
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };
  return (
    <>
      <h2>
        {" "}
        Imagine you had to live without your smartphone for a week. What aspects
        of your daily life would be most affected? (e.g., communictating with
        loved ones, work, studies, etc)
      </h2>
      <hr></hr>

      <textarea
        className="open-answer"
        placeholder="Enter your answer here"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="buttons-container">
        <button className="next-button back" onClick={back}>
          <p>Back</p>
        </button>
        <button
          className={`back-next-button ${isButtonDisabled ? "disabled" : ""}`}
          onClick={handleNext}
        >
          <p>Next</p>
        </button>
      </div>
    </>
  );
}

export default DragQuestion;
