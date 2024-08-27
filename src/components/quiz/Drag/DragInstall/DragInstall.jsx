import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./DragInstall.css";

const DragInstall = ({ next, back, apps, setApps }) => {
  const [appName, setAppName] = useState("");
  const [appReason, setAppReason] = useState("");

  const isAddButtonDisabled = !appName || !appReason;

  const handleAddApp = () => {
    if (!isAddButtonDisabled) {
      setApps((prevApps) => [
        ...prevApps,
        { id: `app-${Date.now()}`, name: appName, reason: appReason },
      ]);
      setAppName("");
      setAppReason("");
    }
  };

  return (
    <>
      <h2 className="title">Now it's time to install some apps!</h2>
      <p className="paragraph">
        Enter the names of the apps you can't live without,{" "}
        <strong>along with the reasons you need them</strong>. Then, on the
        phone below, drag and drop them{" "}
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
        placeholder="Why is this app indispensable for you? Enter min. 20 words"
        value={appReason}
        onChange={(e) => setAppReason(e.target.value)}
        id="reason"
      />
      <button
        className={`add-button ${isAddButtonDisabled ? "disabled" : ""}`}
        onClick={handleAddApp}
        disabled={isAddButtonDisabled}
      >
        Add
      </button>

      <Droppable droppableId="appsContainer">
        {(provided) => (
          <div
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

      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="start-button" onClick={next}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
};

export default DragInstall;
