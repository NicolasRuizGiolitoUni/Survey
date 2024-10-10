import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db";
import "./DragInstall.css";

const DragInstall = ({ next, back, apps, setApps, docId }) => {
  const [appName, setAppName] = useState("");
  const [appReason, setAppReason] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [highlightedAppId, setHighlightedAppId] = useState(null);

  const isAddButtonDisabled = appReason.length === 0 || appName === "";
  const isNextButtonDisabled = apps.length < 8;

  const handleAddApp = async () => {
    if (isAddButtonDisabled) {
      setShowMessage("Enter app name and reason");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    // Check if the app already exists in the apps list
    const appExists = apps.some(
      (app) => app.name.toLowerCase() === appName.toLowerCase()
    );
    if (appExists) {
      setShowMessage("App already exists");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      name: appName,
      reason: appReason,
    };

    const updatedApps = [...apps, newApp];
    setApps(updatedApps);

    await saveAppsToFirestore(updatedApps);

    setAppName("");
    setAppReason("");
  };

  const saveAppsToFirestore = async (updatedApps) => {
    try {
      const docRef = doc(db, "surveyResponses", docId);
      // Save only name and reason, excluding id
      const appsToSave = updatedApps.map((app) => ({
        name: app.name,
        reason: app.reason,
      }));

      await updateDoc(docRef, {
        Selected_apps: appsToSave,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleNext = () => {
    if (isNextButtonDisabled) {
      setShowMessage("Enter at least 8 apps");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    next();
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setAppReason(newReason);
  };

  // Move app up in the list
  const moveUp = async (index) => {
    if (index === 0) return; // Already at the top
    const updatedApps = [...apps];

    // Swap apps
    const temp = updatedApps[index - 1];
    updatedApps[index - 1] = updatedApps[index];
    updatedApps[index] = temp;

    setApps(updatedApps);

    // Highlight the app that moved up (updatedApps[index - 1] is the app that moved up)
    setHighlightedAppId(updatedApps[index - 1].id);
    setTimeout(() => setHighlightedAppId(null), 1000);

    await saveAppsToFirestore(updatedApps); // Save new order to Firestore
  };

  // Move app down in the list
  const moveDown = async (index) => {
    if (index === apps.length - 1) return; // Already at the bottom
    const updatedApps = [...apps];

    // Swap apps
    const temp = updatedApps[index + 1];
    updatedApps[index + 1] = updatedApps[index];
    updatedApps[index] = temp;

    setApps(updatedApps);

    // Highlight the app that moved down (updatedApps[index + 1] is the app that moved down)
    setHighlightedAppId(updatedApps[index + 1].id);
    setTimeout(() => setHighlightedAppId(null), 1000);

    await saveAppsToFirestore(updatedApps); // Save new order to Firestore
  };

  return (
    <>
      <h2 className="title" id="install-title">
        Now it's time to install some apps!
      </h2>
      <hr />
      <p className="paragraph">
        Enter the names of at <strong>least 8 apps</strong> you can't live
        without, <strong>along with the reasons you need them</strong>. Then,
        use the arrows to sort them in order of importance.
      </p>

      <input
        type="text"
        placeholder="App name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Why is this app indispensable for you?"
        value={appReason}
        onChange={handleChangeReason}
        id="reason"
      />

      <button
        className={`add-button ${isAddButtonDisabled ? "disabled" : ""}`}
        onClick={handleAddApp}
      >
        Add
      </button>

      {/* Display the list of apps with up/down arrows */}
      <div id="apps-install" className="apps-container">
        {apps.map((app, index) => (
          <div
            className={`app-item ${
              highlightedAppId === app.id ? "highlighted" : ""
            }`}
            key={app.id}
          >
            <span
              onClick={() => moveUp(index)}
              className="material-symbols-outlined arrow"
            >
              arrow_upward
            </span>
            <div className="app-name">
              {index + 1}. {app.name}
            </div>
            <span
              onClick={() => moveDown(index)}
              className="material-symbols-outlined arrow"
            >
              arrow_downward
            </span>
          </div>
        ))}
      </div>

      <div className="buttons-container">
        <button className="back-next-button back" onClick={back}>
          <p>Back</p>
        </button>
        <button
          className={`back-next-button ${
            isNextButtonDisabled ? "disabled" : ""
          }`}
          onClick={handleNext}
        >
          <p>Next</p>
        </button>
      </div>

      {showMessage && <div className="message">{showMessage}</div>}
    </>
  );
};

export default DragInstall;
