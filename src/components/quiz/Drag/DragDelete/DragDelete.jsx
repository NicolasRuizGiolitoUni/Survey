import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./DragDelete.css";

const DragDelete = ({ back, next, apps, setApps }) => {
  const handleDelete = (appId) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };

  return (
    <>
      <h2 className="title">Review and Delete Apps</h2>
      <p className="paragraph">
        Here is your list of apps. You can choose to delete any unnecessary apps
        from the list.
      </p>

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
                    <div className="app-reason">{app.reason}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="trash-container">
        <Droppable droppableId="trash" isDropDisabled={false}>
          {(provided) => (
            <div
              className="trash-can"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Drag here to delete</h3>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          Back
        </button>
        <button className="start-button" onClick={next}>
          Finish
        </button>
      </div>
    </>
  );
};

export default DragDelete;
