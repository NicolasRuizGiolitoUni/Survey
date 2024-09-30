import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragChosen.css";

const DragChosen = ({ back, next, apps, setApps, docId }) => {
  const [chosenApps, setChosenApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [chooseReason, setChooseReason] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [appReasons, setAppReasons] = useState({}); // Track reasons for each app

  const handleChooseApp = async (appId) => {
    if (charCount < 150) {
      setShowMessage("Enter at least 150 characters");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    const appToChoose = chosenApps.find(
      (app) => app.id.toString() === appId.toString()
    );
    if (!appToChoose) {
      console.error(
        "App to choose not found. Available chosen apps:",
        chosenApps
      );
      return;
    }

    setChosenApps((prevChosenApps) =>
      prevChosenApps.filter((app) => app.id.toString() !== appId.toString())
    );

    // Save the reason for the chosen app
    setAppReasons((prevReasons) => ({
      ...prevReasons,
      [appId]: chooseReason,
    }));

    try {
      const docRef = doc(db, "surveyResponses", docId);
      await updateDoc(docRef, {
        Chosen_apps: arrayUnion({ ...appToChoose, reason: chooseReason }),
      });
      console.log("App chosen and saved to Firestore:", appToChoose);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    setSelectedApp(null);
    setChooseReason("");
    setCharCount(0);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "chosenContainer"
    ) {
      const appToChoose = apps[source.index];
      setApps((prevApps) =>
        prevApps.filter(
          (app) => app.id.toString() !== appToChoose.id.toString()
        )
      );
      setChosenApps((prevChosenApps) => [...prevChosenApps, appToChoose]);
      setSelectedApp(appToChoose);
    } else if (
      source.droppableId === "chosenContainer" &&
      destination.droppableId === "appsContainer"
    ) {
      const appToRestore = chosenApps[source.index];
      setChosenApps((prevChosenApps) =>
        prevChosenApps.filter(
          (app) => app.id.toString() !== appToRestore.id.toString()
        )
      );
      setApps((prevApps) => [...prevApps, appToRestore]);
      setSelectedApp(null);
      // Remove the reason for the restored app
      setAppReasons((prevReasons) => {
        const { [appToRestore.id]: _, ...rest } = prevReasons;
        return rest;
      });
    }
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setChooseReason(newReason);
    setCharCount(newReason.length);
  };

  const handleNext = () => {
    // Check if all chosen apps have reasons
    const allAppsSaved = chosenApps.every((app) => appReasons[app.id]);
    if (!allAppsSaved) {
      setShowMessage("Save all the apps before continuing");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    // Proceed to the next step
    console.log(
      "Chosen apps with reasons:",
      chosenApps.map((app) => ({ name: app.name, reason: appReasons[app.id] }))
    );
    next();
  };

  const handleDisabledNextClick = () => {
    setShowMessage(
      "You must remove all apps from the app list before continuing."
    );
    setTimeout(() => setShowMessage(""), 3000);
  };

  return (
    <>
      <h2 className="title">Time to save your most important apps!</h2>
      <hr />
      <p id="paragraph">
        Now drag and drop your the 5 remaining apps in the box below and enter{" "}
        <strong>why they are the most important ones to you. </strong>
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="appsContainer">
          {(provided) => (
            <div
              id="apps-chosen"
              className="apps-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {apps.map((app, index) => (
                <Draggable
                  key={app.id.toString()}
                  draggableId={app.id.toString()}
                  index={index}
                >
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

        <Droppable droppableId="chosenContainer">
          {(provided) => (
            <div
              className="chosen-apps-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Drag to Save</h3>
              {chosenApps.map((app, index) => (
                <Draggable
                  key={app.id.toString()}
                  draggableId={app.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={`app-item ${
                        selectedApp &&
                        selectedApp.id.toString() === app.id.toString()
                          ? "expanded"
                          : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="app-name" id="app-name-trash">
                        {app.name}
                      </div>

                      {selectedApp &&
                        selectedApp.id.toString() === app.id.toString() && (
                          <>
                            <textarea
                              className="delete-reason"
                              placeholder="Enter reason for choosing this app"
                              value={chooseReason}
                              onChange={handleChangeReason}
                            ></textarea>
                            <button
                              className={`delete-button ${
                                charCount < 150 ? "disabled" : ""
                              }`}
                              onClick={() => handleChooseApp(app.id)}
                            >
                              Save
                            </button>
                          </>
                        )}
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
        <button
          className="back-next-button"
          onClick={apps.length > 0 ? handleDisabledNextClick : handleNext}
          disabled={apps.length > 0} // Disable if there are apps in the appsContainer
        >
          <p>Next</p>
        </button>
      </div>

      {showMessage && <div className="message">{showMessage}</div>}
    </>
  );
};

export default DragChosen;
