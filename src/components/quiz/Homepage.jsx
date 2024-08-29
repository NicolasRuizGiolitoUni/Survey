import React, { useState, useEffect } from "react";
import Survey from "./Survey";
import Intro from "./Intro/Intro";
import DragMain from "./Drag/DragMain/DragMain";
import { db } from "../../db/db";
import { collection, doc, setDoc, getDoc } from "firebase/firestore/lite";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [docId, setDocId] = useState(null);
  const components = [Intro, DragMain, Survey];

  useEffect(() => {
    const initializeDocument = async () => {
      if (docId) return; // Skip if document ID already exists

      const newDocRef = doc(collection(db, "surveyResponses"));
      await setDoc(newDocRef, {}); // Create an empty document
      setDocId(newDocRef.id); // Set document ID in state
    };

    initializeDocument();
    console.log("docId: ", docId);
  }, [docId]); // Dependency on docId ensures document is created only once

  const goToNextComponent = () => {
    if (currentIndex === components.length - 1) {
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    console.log("docId: ", docId);
  };

  const goToPreviousComponent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : components.length - 1
    );
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="app-container">
      <div className="center-container">
        <div className="header">
          <h1>Not-Too-Dumb Phone Survey</h1>
        </div>
        {docId && (
          <CurrentComponent
            goToNextComponent={goToNextComponent}
            goToPreviousComponent={goToPreviousComponent}
            docId={docId} // Pass only docId
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
