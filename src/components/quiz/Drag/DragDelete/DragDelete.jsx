import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./DragDelete.css";

const DragDelete = ({ back, next, apps, setApps }) => {
  const handleDelete = (appId) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };

  const handleNext = () => {
    console.log(apps);
    next();
  };

  return (
    <>
      <h2 className="title">Oops! Your storage is already full! {":("}</h2>
      <p className="paragraph">
        You can only keep <strong>5 apps </strong>. Choose the ones you
        definitely can't live without and drag and drop the rest to the trash
        can below. When deleting the apps,
        <strong> enter the reason why you decided to delete them. </strong>
      </p>

      <Droppable droppableId="appsContainer">
        {(provided) => (
          <div
            className="apps-container"
            id="trash-can"
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
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="start-button" onClick={handleNext}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
};

export default DragDelete;
