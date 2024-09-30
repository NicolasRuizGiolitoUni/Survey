import React from "react";
import "./Intro.css";

const Intro = ({ goToNextComponent }) => {
  return (
    <div className="card">
      <h2>Welcome to the Survey!</h2>
      <hr></hr>
      <h3>
        <strong>Consent Form</strong>
      </h3>
      <p className="paragraph">
        <strong>Researcher:</strong> Dr. Aditya Kumar Purohit
      </p>
      <p className="paragraph">
        <strong>Executing Institution:</strong>{" "}
        <a href="https://www.cais-research.de/en/home/" target="_blank">
          Center for Advanced Internet Studies (CAIS) GmbH
        </a>
      </p>
      <p className="paragraph">
        <strong>Purpose of the Study:</strong> You are being asked to
        participate in a research study to understand the role that specific
        mobile apps play in everyday life. This study aims to gather insights
        into essential apps to explore the design of a simplified "dumb phone"
        that helps reduce smartphone overuse.
      </p>
      <p className="paragraph">
        <strong>What Will You Be Asked to Do?</strong> If you agree to
        participate, you will complete a brief online survey. The survey will
        ask for demographic information (such as age and gender), details about
        your smartphone habits, and your opinions on the apps you consider
        indispensable.
      </p>
      <p className="paragraph">
        <strong>Duration:</strong> The survey will take approximately 10-15
        minutes to complete.
      </p>
      <p className="paragraph">
        <strong>Confidentiality:</strong> Your responses will be kept
        confidential. Any data collected will be anonymized, and no personally
        identifiable information will be linked to your responses. Only the
        research team will have access to the anonymized data.
      </p>
      <p className="paragraph">
        <strong>Voluntary Participation:</strong> Participation in this study is
        entirely voluntary. You are free to decline to participate or stop at
        any time.
      </p>
      <p className="paragraph">
        <strong>Risks and Benefits:</strong> There are no known risks associated
        with this study. While there may be no direct benefit to you for
        participating, your input will help inform a design to reduce smartphone
        overuse, which could benefit society.
      </p>
      <p className="paragraph">
        <strong>Contact Information:</strong> If you have any questions or
        concerns about this study, you may contact Dr. Aditya Kumar Purohit at
        aditya@email.com.
      </p>
      <p className="paragraph">
        By clicking "Start" below, you indicate that you have read this consent
        form, understand the information presented, and agree to participate in
        this survey.
      </p>

      <button className="start-button" onClick={goToNextComponent}>
        Start
      </button>
    </div>
  );
};

export default Intro;
