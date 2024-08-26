import React from "react";
import "./DragDelete.css"; // Make sure to create this file
import Column from "../Column/Column"; // Reuse the Column component

const DragDelete = ({ back, next, apps }) => {
  return (
    <>
      <h2 className="title">Review and Delete Apps</h2>
      <p className="paragraph">
        Here is your list of apps. You can choose to delete any unnecessary apps
        from the list.
      </p>
      {/* Display the same column with draggable apps */}
      <Column apps={apps} />
      <div className="spacing"></div>
      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          Back
        </button>
        <button className="start-button" onClick={next}>
          Finish
        </button>
      </div>
    </>
  );
};

export default DragDelete;
