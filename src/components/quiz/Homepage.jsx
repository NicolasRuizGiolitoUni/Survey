import React, { useState } from "react";
import Survey from "./Survey";
import Intro from "./Intro/InformedConstent";
import DragMain from "./Drag/DragMain/DragMain";
import "./HomePage.css";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null);

  const components = [Intro, DragMain, Survey];

  const goToNextComponent = () => {
    if (currentIndex === components.length - 1) {
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
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
        <h1>Minimalist Smartphone Survey</h1>
      </header>
      <div className="card">
        {error ? (
          <div className="error-message">
            {error}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : docId ? (
          <CurrentComponent
            goToNextComponent={goToNextComponent}
            goToPreviousComponent={goToPreviousComponent}
            docId={docId}
          />
        ) : (
          // Pass setDocId to Intro to handle document creation
          <Intro goToNextComponent={goToNextComponent} setDocId={setDocId} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
