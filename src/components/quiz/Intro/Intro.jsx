import React from "react";
import "./Intro.css";

const Intro = ({ onStart }) => {
  return (
    <div className="card">
      <h2>Welcome to the Survey!</h2>
      <p>
        We appreciate your participation in this survey. Your responses will
        help us understand user experiences better. Click "Start" to begin the
        survey.
      </p>
      <button className="start-button" onClick={onStart}>
        Start
      </button>
    </div>
  );
};

export default Intro;
