import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../db/db"; // Adjust the path as necessary
import "./DragChosen.css";

const DragChosen = ({ apps, setApps, docId, next }) => {
  const [chosenApps, setChosenApps] = useState([]);
  const [chooseReason, setChooseReason] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [isReasonSubmitted, setIsReasonSubmitted] = useState(false); // Tracks if reason is submitted

  // Calculate word count by splitting the text by spaces and filtering out empty strings
  const calculateWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleDisabledNextClick = () => {
    setShowMessage("Please submit the reason for choosing your apps.");
    setTimeout(() => setShowMessage(""), 3000);
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
    }
  };

  const handleChangeReason = (e) => {
    const newReason = e.target.value;
    setChooseReason(newReason);
    setWordCount(calculateWordCount(newReason)); // Calculate word count dynamically
  };

  const handleSubmit = async () => {
    if (wordCount < 50) {
      setShowMessage("Please enter at least 50 words.");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    try {
      const docRef = doc(db, "surveyResponses", docId);

      // Create an object with all the chosen app names and the reason
      const finalChosenApps = {
        apps: apps.map((app) => app.name), // Array of app names
        reason: chooseReason, // The same reason for all apps
      };

      // Save the structure in Firestore
      await updateDoc(docRef, {
        finalChosenApps: finalChosenApps,
      });

      setIsReasonSubmitted(true); // Mark as submitted

      // Log the updated document
      const updatedDoc = await getDoc(docRef);
      console.log("Updated document:", updatedDoc.data());

      setTimeout(() => setShowMessage(""), 3000);
      next();
    } catch (error) {
      console.error("Error updating document:", error);
      setShowMessage("Failed to submit. Try again.");
      setTimeout(() => setShowMessage(""), 3000);
    }
  };

  return (
    <>
      <h2 className="title">Your new phone is almost ready to use!</h2>
      <hr />
      <p className="paragraph">
        Tell us why these are the most important apps for you.{" "}
        <strong>
          Why do you think you can't live without them? What value do they offer
          you?{" "}
        </strong>
      </p>

      <textarea
        placeholder="Enter at least 50 words."
        id="reason"
        value={chooseReason}
        onChange={handleChangeReason}
      ></textarea>

      <button
        className={`add-button ${wordCount < 50 ? "disabled" : ""}`}
        onClick={handleSubmit}
      >
        Submit
      </button>

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
      </DragDropContext>

      {showMessage && <div className="message">{showMessage}</div>}
    </>
  );
};

export default DragChosen;
