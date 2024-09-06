import React, { useState, useEffect } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragDelete.css";

const DragDelete = ({
  back,
  next,
  apps,
  setApps,
  trashApps,
  setTrashApps,
  docId,
}) => {
  const [deletedApps, setDeletedApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");

  const handleDeleteApp = async (appId) => {
    const appToDelete = trashApps.find((app) => app.id === appId);
    setTrashApps((prevTrashApps) =>
      prevTrashApps.filter((app) => app.id !== appId)
    );
    setDeletedApps((prevDeletedApps) => [...prevDeletedApps, appToDelete]);

    // Update Firestore document with the deleted app
    try {
      const docRef = doc(db, "surveyResponses", docId);
      await updateDoc(docRef, {
        Deleted_apps: arrayUnion({ ...appToDelete, reason: deleteReason }), // Save deleted app and reason to Firestore
      });
      console.log("Deleted app added to Firestore:", appToDelete);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    // Reset state
    setSelectedApp(null);
    setDeleteReason("");
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // If the app is dropped in the trash
    if (destination.droppableId === "trash") {
      const appToDelete = apps[source.index];
      setTrashApps((prevTrashApps) => [...prevTrashApps, appToDelete]);
      setApps((prevApps) =>
        prevApps.filter((app) => app.id !== appToDelete.id)
      );
      setSelectedApp(appToDelete);
    }
  };

  return (
    <>
      <h2 className="title">Oops! Your storage is already full! {":("}</h2>
      <p id="paragraph-delete">
        You can only keep <strong>5 apps</strong>. Choose the ones you
        definitely can't live without and drag and drop the rest to the trash
        can below. When deleting the apps,{" "}
        <strong>enter the reason why you decided to delete them.</strong>
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="appsContainer">
          {(provided) => (
            <div
              id="apps-delete"
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

        <div className="trash-container">
          <Droppable droppableId="trash">
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
                        className={`app-item ${
                          selectedApp && selectedApp.id === app.id
                            ? "expanded"
                            : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="app-name">{app.name}</div>

                        {selectedApp && selectedApp.id === app.id && (
                          <>
                            <textarea
                              className="delete-reason"
                              placeholder="Enter reason for deleting this app"
                              value={deleteReason}
                              onChange={(e) => setDeleteReason(e.target.value)}
                            ></textarea>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteApp(app.id)}
                              disabled={!deleteReason}
                            >
                              Delete
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
        </div>
      </DragDropContext>

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
