import React from "react";
import "./DragInstall.css";

const DragInstall = ({ next, back }) => {
  return (
    <>
      <h2 className="title">Now it's time to install some apps!</h2>
      <p className="paragraph">
        Enter the names of the apps you can't live without,{" "}
        <strong>along with the reasons you need them</strong>. Then, on the
        phone below, drag and drop them{" "}
        <strong> in order of importance </strong> from top to bottom.
      </p>

      <div className="spacing"></div>
      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          Back
        </button>
        <button className="start-button" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
};

export default DragInstall;
