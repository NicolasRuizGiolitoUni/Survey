import React from "react";

const DragIntro = ({ next }) => {
  return (
    <>
      <h2 className="title">Scenario</h2>
      <hr></hr>
      <p className="paragraph">
        Imagine your current smartphone breaks and you are given a new one.{" "}
      </p>
      <p className="paragraph">
        However, this phone is not like any other. {""}
        It can only support <strong> a limited number of apps</strong>—those you
        absolutely cannot live without.
      </p>
      <p className="paragraph">
        Think about your daily life, work, hobbies, and routines.{" "}
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
