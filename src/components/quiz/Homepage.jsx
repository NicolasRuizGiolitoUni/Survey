import React, { useState } from "react";
import Survey from "./Survey";
import Intro from "./Intro/Intro";
import DragMain from "./Drag/DragMain/DragMain";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    <div className="app-container">
      <div className="center-container">
        <div className="header">
          <h1>Not-Too-Dumb Phone Survey</h1>
        </div>
        <CurrentComponent
          goToNextComponent={goToNextComponent}
          goToPreviousComponent={goToPreviousComponent}
        />
      </div>
    </div>
  );
};

export default HomePage;
