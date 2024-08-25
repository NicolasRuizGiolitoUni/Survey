import React from "react";
import "./DragIntro.css";

const DragIntro = ({ onNext }) => {
  return (
    <div className="card">
      <h2>Thank You for Completing the Questionnaire!</h2>
      <p>
        You've successfully completed the questionnaire. The next part of the
        survey will begin shortly. Click "Next" to proceed.
      </p>
      <button className="start-button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default DragIntro;
