import React from "react";
import "./DragIntroSecond.css";

const DragIntroSecond = ({ next, back }) => {
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
      <p id="paragraph-drag-intro">
        Take your time as you reflect on how these apps help you through your
        day.{" "}
        <strong>
          If you have your phone with you, open your homescreen and review your
          apps to help you identify the most essential ones.{" "}
        </strong>
      </p>

      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="start-button" onClick={next}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
};

export default DragIntroSecond;
