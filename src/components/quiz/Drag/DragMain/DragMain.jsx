import React, { useState } from "react";
import "./DragMain.css";
import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";
import DragIntroSecond from "../DragIntro/DragIntroSecond";
import DragDelete from "../DragDelete/DragDelete";
import { DragDropContext } from "react-beautiful-dnd";
import DragOS from "../DragOS/DragOS";

const DragMain = ({ goToNextComponent, goToPreviousComponent }) => {
  const [index, setIndex] = useState(0);
  const [apps, setApps] = useState([]);
  const [trashApps, setTrashApps] = useState([]);

  const nextScreen = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevScreen = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      goToPreviousComponent();
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "trash"
    ) {
      // Move item to trash
      const movedApp = apps.find((app) => app.id === draggableId);
      setApps((prevApps) => prevApps.filter((app) => app.id !== draggableId));
      setTrashApps((prevTrashApps) => [...prevTrashApps, movedApp]);
    } else if (
      source.droppableId === "trash" &&
      destination.droppableId === "appsContainer"
    ) {
      // Move item back to apps
      const movedApp = trashApps.find((app) => app.id === draggableId);
      setTrashApps((prevTrashApps) =>
        prevTrashApps.filter((app) => app.id !== draggableId)
      );
      setApps((prevApps) => [...prevApps, movedApp]);
    } else if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "appsContainer"
    ) {
      // Reorder items within apps container
      const reorderedApps = Array.from(apps);
      const [movedApp] = reorderedApps.splice(source.index, 1);
      reorderedApps.splice(destination.index, 0, movedApp);
      setApps(reorderedApps);
    }
  };

  const components = [
    <DragIntro next={nextScreen} back={goToPreviousComponent} />,
    <DragOS next={nextScreen} back={prevScreen} />,
    <DragIntroSecond next={nextScreen} back={prevScreen} />,
    <DragOS next={nextScreen} back={prevScreen} />,
    <DragInstall
      next={nextScreen}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
    />,
    <DragDelete
      next={goToNextComponent}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
      trashApps={trashApps}
      setTrashApps={setTrashApps}
    />,
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="card">{components[index]}</div>
    </DragDropContext>
  );
};

export default DragMain;
