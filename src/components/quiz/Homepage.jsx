import React, { useState, useEffect } from "react";
import Survey from "./Survey";
import Intro from "./Intro/InformedConstent";
import DragMain from "./Drag/DragMain/DragMain";
import { db } from "../../db/db";
import { collection, doc, setDoc, getDoc } from "firebase/firestore/lite";
import "./HomePage.css";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const components = [Intro, DragMain, Survey];

  useEffect(() => {
    const initializeDocument = async () => {
      if (docId) return;

      try {
        const newDocRef = doc(collection(db, "surveyResponses"));
        await setDoc(newDocRef, {});
        setDocId(newDocRef.id);
      } catch (error) {
        setError(
          "Something went wrong while initializing your session. Please try again."
        ); // Set error message
        console.error("Failed to initialize document:", error);
      }
    };

    initializeDocument();
    console.log("Current docId in HomePage: ", docId);
  }, [docId]);

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
    <div className="container">
      <header>
        <h1>Not-Too-Dumb Phone Survey</h1>
      </header>
      <div className="card">
        {error ? (
          <div className="error-message">
            {error}
            {/* Optionally add a retry button */}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          docId && (
            <CurrentComponent
              goToNextComponent={goToNextComponent}
              goToPreviousComponent={goToPreviousComponent}
              docId={docId}
            />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
