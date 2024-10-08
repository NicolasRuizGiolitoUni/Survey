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
  const [showMessage, setShowMessage] = useState("");
  const [showNextButtonMessage, setShowNextButtonMessage] = useState(""); // State for Next button message
  const [wordCount, setWordCount] = useState(0); // State for word count
  const [appCount, setAppCount] = useState(apps.length); // Track the number of apps

  const handleDeleteApp = async (appId) => {
    // Check if the delete reason has at least 50 words
    if (wordCount < 50) {
      setShowMessage("Enter at least 50 words");
      setTimeout(() => {
        setShowMessage("");
      }, 3000);
      return;
    }

    // Find the app to delete from trashApps
    const appToDelete = trashApps.find((app) => app.id === appId);

    // Remove the app from trashApps and add it to the deletedApps state
    setTrashApps((prevTrashApps) =>
      prevTrashApps.filter((app) => app.id !== appId)
    );
    setDeletedApps((prevDeletedApps) => [...prevDeletedApps, appToDelete]);

    // Prepare the app data to be saved (excluding the `id`)
    const appDataToSave = {
      name: appToDelete.name,
      reason: deleteReason,
    };

    // Update Firestore with only the current deleted app data
    try {
      const docRef = doc(db, "surveyResponses", docId);
      await updateDoc(docRef, {
        Deleted_apps: arrayUnion(appDataToSave), // Only add the current app data
      });
      console.log("Deleted app added to Firestore:", appDataToSave);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    // Reset the state
    setSelectedApp(null);
    setDeleteReason("");
    setIsTrashOccupied(false);
    setWordCount(0); // Reset word count
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
        setShowMessage("You can only drop one item at a time!"); // Show message if trash can is occupied
        setTimeout(() => {
          setShowMessage(""); // Hide the message after 3 seconds
        }, 3000);
        return; // Exit the function early
      }

      // Prevent deletion if there's only 1 app left
      if (appCount === 1) {
        setShowMessage("At least 1 app must remain.");
        setTimeout(() => setShowMessage(""), 3000); // Hide message after 3 seconds
        return; // Exit function to stop dragging to trash
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
      setAppCount((prevCount) => prevCount - 1); // Update app count
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
      setAppCount((prevCount) => prevCount + 1); // Update app count
    }
  };

  // Function to count words in the deleteReason
  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setDeleteReason(newReason);
    setWordCount(countWords(newReason)); // Update word count
  };

  const handleClickNext = () => {
    // Enforce that there must be at least 5 apps to proceed to the next screen
    if (appCount > 5) {
      setShowNextButtonMessage("Your storage is still full! Delete more apps.");
      setTimeout(() => {
        setShowNextButtonMessage(""); // Hide the message after 3 seconds
      }, 3000);
      return; // Exit the function early
    }

    next();
  };

  const isNextButtonDisabled = appCount > 5;

  return (
    <>
      <h2 className="title">Oops! Your storage is already full! {":("}</h2>
      <hr></hr>
      <p className="paragraph">
        You need to delete apps until at least <strong>5 </strong>remain.
        Consider which apps you truly need and drag the rest to the trash can
        below. For each app you delete, please provide a reason.{" "}
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
                        <div className="app-name" id="app-name-trash">
                          {app.name}
                        </div>

                        {selectedApp && selectedApp.id === app.id && (
                          <>
                            <textarea
                              className="delete-reason"
                              placeholder="Why are you deleting this app? Enter at least 50 words"
                              value={deleteReason}
                              onChange={handleChangeReason}
                            ></textarea>

                            <button
                              className={`delete-button ${
                                wordCount < 50 ? "disabled" : ""
                              }`}
                              onClick={() => handleDeleteApp(app.id)}
                            >
                              Delete app
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

      {showMessage && <div className="message">{showMessage}</div>}
      <div className="buttons-container">
        <button
          className={`back-next-button ${
            isNextButtonDisabled ? "disabled" : ""
          }`}
          onClick={handleClickNext} // Updated to use handleClickNext
        >
          <p>Next</p>
        </button>
      </div>
      {showNextButtonMessage && (
        <div className="message">{showNextButtonMessage}</div>
      )}
    </>
  );
};

export default DragDelete;
