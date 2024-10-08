import React from "react";
import "./DragIntroSecond.css";

const DragIntroSecond = ({ next, back }) => {
  const categories = [
    "Social media",
    "Messaging",
    "Email",

    "Music",
    "News",
    "Video streaming",
    "Work-related apps",
    "Health and fitness",
    "Finance and banking",
  ];
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
      <hr></hr>
      <p className="paragraph">
        {" "}
        If you have your phone with you, go to your home screen and try to
        identify those essential apps. Keep in mind the following categories:{" "}
      </p>
      <div className="app-categories-container">
        {categories.map((category, index) => (
          <div key={index} className="app-category">
            {category}
          </div>
        ))}
      </div>

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
