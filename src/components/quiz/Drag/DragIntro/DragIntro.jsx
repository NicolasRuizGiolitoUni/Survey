import React from "react";

const DragIntro = ({ next }) => {
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
      <hr></hr>
      <p className="paragraph">
        Imagine your current smartphone breaks and you are given a blank slate
        to customize your perfect phone from scratch. However, this phone{" "}
        <strong>
          can only support a limited number of apps—those you absolutely cannot
          live without{" "}
        </strong>
        . Think about your daily life, work, hobbies, and routines.{" "}
        <strong>What apps do you rely on the most, and why? </strong>
      </p>
      <div className="buttons-container">
        <button className="start-button" onClick={next}>
          <p>Next</p>
        </button>
      </div>
    </>
  );
};

export default DragIntro;
