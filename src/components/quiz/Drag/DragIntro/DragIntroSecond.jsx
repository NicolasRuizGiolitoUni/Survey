import React from "react";

const DragIntroSecond = ({ next, back }) => {
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
      <hr></hr>
      <p className="paragraph">
        Take your time as you reflect on how these apps help you through your
        day.{" "}
        <strong>
          If you have your phone with you, open your homescreen and review your
          apps to help you identify the most essential ones.{" "}
        </strong>
      </p>

      <div className="buttons-container">
        <button className="back-next-button back" onClick={back}>
          <p>Back</p>
        </button>
        <button className="back-next-button" onClick={next}>
          <p>Next</p>
        </button>
      </div>
    </>
  );
};

export default DragIntroSecond;
