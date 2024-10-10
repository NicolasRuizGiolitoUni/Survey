import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../../db/db"; // Adjust path as needed
import "./InformedConsent.css";

const Intro = ({ goToNextComponent, setDocId }) => {
  const [error, setError] = useState(null); // Add error state

  const handleStartClick = async () => {
    try {
      // Create a new Firestore document in the "surveyResponses" collection
      const newDocRef = doc(collection(db, "surveyResponses"));
      await setDoc(newDocRef, {});

      // Set the document ID in the parent component state
      setDocId(newDocRef.id);

      // Proceed to the next component
      goToNextComponent();
    } catch (error) {
      setError(
        "Something went wrong while initializing your session. Please try again."
      );
      console.error("Failed to initialize document:", error);
    }
  };
  return (
    <>
      <h2>Welcome to the Survey!</h2>
      <hr></hr>
      <h3 className="informed-consent">
        <strong>Informed Consent Form</strong>
      </h3>
      <p className="paragraph">
        Dear particpant of the survey, we ask for your consent to participate in
        the scientific research project "Minimalist Smartphone Survey" and the
        involved processing of your personal data. For this reason you receive
        the following information about the content and the sequence of the
        scientific research project as well as the intended use of your data:
      </p>
      <div className="consent-paragraph">
        <p className="consent-title">What is the purpose of the study?</p>
        <p className="paragraph">
          The scientific research is conducted to understand the role that
          specific mobile apps play in everyday life with the aim to explore the
          desing of a simplified "dumb phone" that helps reduce smartphone
          overuse.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          {" "}
          What is the exact procedure for the scientific research project?
        </p>
        <p className="paragraph">
          Your participation in the study will probably take about 10-15 minutes
          and consists entirely of an online survey.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          What costs are incurred by the participation in the scientific
          research project and will an expense allowance be paid?
        </p>
        <p className="paragraph">
          By participating in the scientific research project no additional
          costs are incurred. No remuneration/expense will be paid for your
          participation in the scientific research project. Claims for further
          remuneration, royalties or other participation in financial benefits
          and profits, that may be achieved on the basis of the research
          results, are excluded.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          Who decides whether I should withdraw from the scientific research
          project prematurely?
        </p>
        <p className="paragraph">
          Participation in this scientific research project is voluntary. You
          may terminate your participation at any time without giving reason and
          without incurring disadvantages. Under certain circumstances, however,
          it is possible that a scientific research project is terminated
          prematurely, for example for organisational reasons. If, during the
          course of the scientific research project, important new information
          comes to light which could affect your decision to continue your
          participation in this scientific research project, you will be
          informed. 
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          What data is collected in the scientific research project?
        </p>
        <p className="paragraph">
          In the context of the scientific research project the following data
          will be collected from you: age group, country of origin, gender,
          language(s), and project-specific data (your responses of each
          question in the survey).
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          How is the data processing in the scientific research project carried
          out?
        </p>
        <p className="paragraph">
          The produced project data, i.e., the responses to the survey, will be
          evaluated by project members. The original data or -records are kept
          for at least 10 years in accordance with the guidelines for handling
          research data of the German Research Foundation for safeguarding good
          research practice and are deleted afterwards, unless legal
          requirements stipulate longer archiving obligations.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          Who has knowledge of the data and which persons and institutions have
          access to the data?
        </p>
        <p className="paragraph">
          Access to your data is restricted to employees of the scientific
          research project as well as authorised scientists. These persons are
          obliged to observe the data protection requirements. The data is
          protected against unauthorised access.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          What rights do individuals affected by the data processing have?
        </p>
        <p className="paragraph">
          Participation in the scientific research project is voluntary; if you
          do not participate, you will not suffer any disadvantages. You have
          the possibility to assert the following rights at any time:
        </p>
        <ul id="consent-list">
          <li id="consent-list-item">
            Right of access about the personal data processed concerning you
            (art. 15 GDPR),
          </li>
          <li id="consent-list-item">
            Right to rectification of inaccurate personal data concerning you
            (art. 16 GDPR),
          </li>
          <li id="consent-list-item">
            Right to erasure of personal data concerning you (art. 17 GDPR),
          </li>
          <li id="consent-list-item">
            Right to restriction of processing of personal data concerning you
            (art. 18 GDPR),
          </li>
          <li id="consent-list-item">
            Right to object to the processing of personal data concerning you
            (art. 21 GDPR),
          </li>
          <li id="consent-list-item">
            You also have the right to lodge a complaint with a data protection
            supervisory authority about the processing of personal data by us
            concerning you (art. 77 GDPR),
          </li>
          <li id="consent-list-item">
            If you have consented to the processing of your data, you have the
            right to withdraw this consent at any time for the future (art. 7
            paragraph 3 GDPR). In this case, all personal data must either be
            deleted or made anonymous.
          </li>
        </ul>
        <p className="paragraph">
          Your rights must always be asserted in writing to the person
          responsible for data processing.
        </p>
      </div>
      <div className="consent-paragraph">
        <p className="consent-title">
          Who is responsible for the scientific research project and the
          associated data processing? Who can I contact if I have further
          questions?
        </p>
        <p className="paragraph">
          The scientific research project is carried out by{" "}
          <a href="https://www.cais-research.de/en/home/" target="_blank">
            Center for Advanced Internet Studies (CAIS) GmbH.
          </a>{" "}
          The person responsible for data processing is Dr. Aditya Kumar
          Purohit. If you have any questions about the scientific research
          project or the associated data processing, please contact him at the
          following address: aditya.purohit@cais-research.de
        </p>
        <p className="paragraph">
          If you agree to participate in the study, please press start.
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="buttons-container">
        <button className="start-button" onClick={handleStartClick}>
          Start
        </button>
      </div>
    </>
  );
};

export default Intro;
