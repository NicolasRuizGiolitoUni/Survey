import React from "react";
import "./Intro.css";

const Intro = ({ goToNextComponent }) => {
  return (
    <div className="card">
      <h2>Welcome to the Survey!</h2>
      <hr></hr>
      <p className="paragraph">
        We appreciate your participation in this survey. Your responses will
        help us understand user experiences better. Click "Start" to begin the
        survey.
      </p>
      <button className="start-button" onClick={goToNextComponent}>
        Start
      </button>
    </div>
  );
};

export default Intro;
