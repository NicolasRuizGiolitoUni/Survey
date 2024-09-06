import React, { useState } from "react";
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
  const [originalIndexMap, setOriginalIndexMap] = useState(new Map());
  const [isTrashOccupied, setIsTrashOccupied] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // State to control the visibility of the message

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
        Deleted_apps: arrayUnion({ ...appToDelete, reason: deleteReason }),
      });
      console.log("Deleted app added to Firestore:", appToDelete);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    // Reset state
    setSelectedApp(null);
    setDeleteReason("");
    setIsTrashOccupied(false);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Move app from apps to trash
    if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "trash"
    ) {
      if (isTrashOccupied) {
        setShowMessage(true); // Show the message if trash can is occupied
        setTimeout(() => {
          setShowMessage(false); // Hide the message after 3 seconds
        }, 3000);
        return; // Exit the function early
      }

      const appToDelete = apps[source.index];
      setTrashApps((prevTrashApps) => [...prevTrashApps, appToDelete]);
      setApps((prevApps) =>
        prevApps.filter((app) => app.id !== appToDelete.id)
      );
      setSelectedApp(appToDelete);
      setOriginalIndexMap((prevMap) =>
        new Map(prevMap).set(appToDelete.id, source.index)
      );
      setIsTrashOccupied(true);
    }

    // Move app from trash back to apps
    if (
      source.droppableId === "trash" &&
      destination.droppableId === "appsContainer"
    ) {
      const appToRestore = trashApps[source.index];
      setApps((prevApps) => {
        const updatedApps = [...prevApps];
        const originalIndex = originalIndexMap.get(appToRestore.id);
        updatedApps.splice(originalIndex, 0, appToRestore);
        return updatedApps;
      });
      setTrashApps((prevTrashApps) =>
        prevTrashApps.filter((app) => app.id !== appToRestore.id)
      );
      setSelectedApp(null);
      setOriginalIndexMap((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.delete(appToRestore.id);
        return newMap;
      });
      setIsTrashOccupied(false);
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

      {showMessage && (
        <div className="message">You can only drop one item at a time!</div>
      )}
    </>
  );
};

export default DragDelete;
