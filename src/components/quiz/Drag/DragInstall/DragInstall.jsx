import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragInstall.css";

const DragInstall = ({ next, back, apps, setApps, docId }) => {
  const [appName, setAppName] = useState("");
  const [appReason, setAppReason] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  const isAddButtonDisabled = !appName || charCount < 150;
  const isNextButtonDisabled = apps.length < 8;

  const handleAddApp = async () => {
    if (isAddButtonDisabled) {
      setShowMessage("Enter at least 150 characters");
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
      await updateDoc(docRef, {
        Selected_apps: updatedApps,
      });
      console.log("App added to Firestore:", newApp);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    setAppName("");
    setAppReason("");
    setCharCount(0);
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

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setAppReason(newReason);
    setCharCount(newReason.length);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedApps = Array.from(apps);
    const [movedApp] = reorderedApps.splice(result.source.index, 1);
    reorderedApps.splice(result.destination.index, 0, movedApp);

    setApps(reorderedApps);

    // Update Firestore with the new order
    try {
      const docRef = doc(db, "surveyResponses", docId);
      await updateDoc(docRef, {
        Selected_apps: reorderedApps,
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
      <p class="paragraph">
        Enter the names of at <strong>least 8 apps</strong> you can't live
        without, <strong>along with the reasons you need them</strong>. Then, on
        the phone below, drag and drop them{" "}
        <strong> in order of importance </strong> from top to bottom.
      </p>

      <input
        type="text"
        placeholder="Enter app name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Why is this app indispensable for you? Enter min. 150 characters"
        value={appReason}
        onChange={handleChangeReason}
        id="reason"
      />
      {charCount < 150 && <div className="char-count">{charCount}/150</div>}

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
                      <div className="app-name">{app.name}</div>
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
