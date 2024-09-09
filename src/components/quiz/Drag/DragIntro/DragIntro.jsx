import React from "react";
import "./DragIntro.css";

const DragIntro = ({ next }) => {
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
      <p id="paragraph-drag-intro">
        Imagine your current smartphone breaks and you are given a blank slate
        to customize your perfect phone from scratch. However, this phone{" "}
        <strong>
          can only support a limited number of apps—those you absolutely cannot
          live without{" "}
        </strong>
        . Think about your daily life, work, hobbies, and routines.{" "}
        <strong>What apps do you rely on the most, and why? </strong>
      </p>

      <button className="start-button" onClick={next}>
        <p>Next</p>
      </button>
    </>
  );
};

export default DragIntro;
