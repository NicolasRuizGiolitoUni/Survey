import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragInstall.css";

const DragInstall = ({ next, back, apps, setApps, docId }) => {
  const [appName, setAppName] = useState("");
  const [appReason, setAppReason] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Update the condition to check for 50 words
  const isAddButtonDisabled = !appName || wordCount < 50;
  const isNextButtonDisabled = apps.length < 8;

  const handleAddApp = async () => {
    if (isAddButtonDisabled) {
      setShowMessage("Enter at least 50 words");
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
      console.log("App added to Firestore:", newApp);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    setAppName("");
    setAppReason("");
    setWordCount(0); // Reset word count after adding
  };

  const handleNext = () => {
    if (isNextButtonDisabled) {
      setShowMessage("Enter at least 8 apps");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    // Proceed to the next step
    console.log("Apps:", apps);
    next();
  };

  // Function to count words in the appReason
  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setAppReason(newReason);
    setWordCount(countWords(newReason)); // Set word count
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedApps = Array.from(apps); // Clone the apps array
    const [movedApp] = reorderedApps.splice(result.source.index, 1); // Remove the dragged app
    reorderedApps.splice(result.destination.index, 0, movedApp); // Insert the dragged app in the new position

    setApps(reorderedApps); // Update the local state with the new order

    // Update Firestore with the new order immediately
    try {
      const docRef = doc(db, "surveyResponses", docId);

      // Save only name and reason, excluding the id
      const appsToSave = reorderedApps.map((app) => ({
        name: app.name,
        reason: app.reason,
      }));

      await updateDoc(docRef, {
        Selected_apps: appsToSave,
      });

      console.log("Apps reordered in Firestore:", reorderedApps);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <h2 className="title" id="install-title">
        Now it's time to install some apps!
      </h2>
      <hr />
      <p className="paragraph">
        Enter the names of at <strong>least 8 apps</strong> you can't live
        without, <strong>along with the reasons you need them</strong>. Then, on
        the phone below, <strong>sort them in order of importance</strong>.
      </p>

      <input
        type="text"
        placeholder="App name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Why is this app indispensable for you? Enter at least 50 words"
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

      {/* Wrap the drag and drop area inside the DragDropContext */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="appsContainer">
          {(provided) => (
            <div
              id="apps-install"
              className="apps-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {apps.map((app, index) => (
                <Draggable key={app.id} draggableId={app.id} index={index}>
                  {(provided) => (
                    <div
                      className="app-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="app-name">
                        {index + 1}. {app.name}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
