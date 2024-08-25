import React from "react";
import "./DragIntro.css";

const DragIntro = ({ next }) => {
  return (
    <>
      <h2 className="title">What apps you can't live without?</h2>
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
      <p className="paragraph">
        Take your time as you reflect on how these apps help you through your
        day.{" "}
        <strong>
          If you have your phone with you, open your homescreen and review your
          apps to help you identify the most essential ones.{" "}
        </strong>
      </p>

      <button className="start-button" onClick={next}>
        Next
      </button>
    </>
  );
};

export default DragIntro;
