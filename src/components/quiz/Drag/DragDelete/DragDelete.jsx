import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./DragDelete.css";

const DragDelete = ({ back, next, apps, setApps, trashApps, setTrashApps }) => {
  const [currentDraggedApp, setCurrentDraggedApp] = useState(null);
  const [deletedApps, setDeletedApps] = useState([]);

  const handleDelete = (appId) => {
    setTrashApps((prevTrashApps) =>
      prevTrashApps.filter((app) => app.id !== appId)
    );
    setDeletedApps((prevDeletedApps) => [
      ...prevDeletedApps,
      trashApps.find((app) => app.id === appId),
    ]);
    setCurrentDraggedApp(null);
  };

  const handleDragStart = (appId) => {
    setCurrentDraggedApp(appId);
  };

  const handleDragEnd = () => {
    setCurrentDraggedApp(null);
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
            id="apps-delete"
            className="apps-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {apps.map((app, index) => (
              <Draggable
                key={app.id}
                draggableId={app.id}
                index={index}
                onDragStart={() => handleDragStart(app.id)}
                onDragEnd={handleDragEnd}
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

      <div className="trash-container">
        <Droppable droppableId="trash" isDropDisabled={false}>
          {(provided) => (
            <div
              className="trash-can"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Drag here to remove</h3>
              {trashApps.map((app, index) => (
                <Draggable key={app.id} draggableId={app.id} index={index}>
                  {(provided) => (
                    <div
                      className="app-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="app-name">{app.name}</div>
                      {currentDraggedApp === app.id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(app.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div id="buttons-delete" className="buttons-container">
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

export default DragDelete;
