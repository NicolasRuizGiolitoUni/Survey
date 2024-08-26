import React from "react";
import "./DragInstall.css";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "../Column/Column";
import { arrayMove } from "@dnd-kit/sortable";
import AppInput from "../AppInput/AppInput";

const DragInstall = ({ next, back, apps, setApps }) => {
  const addApp = (name, reason) => {
    setApps((apps) => [...apps, { id: apps.length + 1, name, reason }]);
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
        Enter the names of the apps you can't live without,{" "}
        <strong>along with the reasons you need them</strong>. Then, on the
        phone below, drag and drop them{" "}
        <strong> in order of importance </strong> from top to bottom.
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
