import React from "react";
import { useState } from "react";
import "./DragInstall.css";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "../Column/Column";
import { arrayMove } from "@dnd-kit/sortable";
import AppInput from "../AppInput/AppInput";

const DragInstall = ({ next, back }) => {
  const [apps, setApps] = useState([]);

  const addApp = (name) => {
    setApps((apps) => [...apps, { id: apps.length + 1, name }]);
  };

  const getAppPosition = (id) => apps.findIndex((app) => app.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setApps((apps) => {
      const originalPosition = getAppPosition(active.id);
      const newPosition = getAppPosition(over.id);

      return arrayMove(apps, originalPosition, newPosition);
    });
  };

  return (
    <>
      <h2 className="title">Now it's time to install some apps!</h2>
      <p className="paragraph">
        Make a list of the apps you consider indispensable, and next to each
        one, explain why it is essential for you. You can list as many apps as
        you want.
      </p>
      <AppInput onSubmit={addApp} />
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column apps={apps} />
      </DndContext>
      <div className="spacing"></div>
      <div className="buttons-container">
        <button className="start-button" onClick={back}>
          Back
        </button>
        <button className="start-button" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
};

export default DragInstall;
