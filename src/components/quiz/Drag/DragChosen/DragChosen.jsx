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
    }
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setChooseReason(newReason);
    setCharCount(newReason.length);
  };

  return (
    <>
      <h2 className="title">Choose your essential apps!</h2>
      <p id="paragraph-chosen">
        Select up to <strong>5 essential apps</strong> you can't live without.
        Drag and drop them into the green container below and explain{" "}
        <strong>why you chose them (min. 150 characters)</strong>.
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
                      <div className="app-name" id="app-name-chosen">
                        {app.name}
                      </div>

                      {selectedApp &&
                        selectedApp.id.toString() === app.id.toString() && (
                          <>
                            <textarea
                              className="choose-reason"
                              placeholder="Enter reason for choosing this app"
                              value={chooseReason}
                              onChange={handleChangeReason}
                            ></textarea>
                            <button
                              className={`choose-button ${
                                charCount < 150 ? "disabled" : ""
                              }`}
                              onClick={() => handleChooseApp(app.id)}
                            >
                              Choose
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

      <div id="buttons-chosen" className="buttons-container">
        <button className="back-next-button" onClick={back}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="back-next-button" onClick={next}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {showMessage && <div className="message">{showMessage}</div>}
    </>
  );
};

export default DragChosen;
