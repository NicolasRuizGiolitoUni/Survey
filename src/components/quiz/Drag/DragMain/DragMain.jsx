import React, { useState } from "react";
import "./DragMain.css";
import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";
import DragIntroSecond from "../DragIntro/DragIntroSecond";
import DragDelete from "../DragDelete/DragDelete";
import { DragDropContext } from "react-beautiful-dnd";

const DragMain = () => {
  const [index, setIndex] = useState(0);
  const [apps, setApps] = useState([]);

  const nextScreen = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevScreen = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "appsContainer"
    ) {
      const reorderedApps = Array.from(apps);
      const [movedApp] = reorderedApps.splice(source.index, 1);
      reorderedApps.splice(destination.index, 0, movedApp);
      setApps(reorderedApps);
    }

    if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "trash"
    ) {
      handleDelete(result.draggableId);
    }
  };

  const handleDelete = (appId) => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== appId));
  };

  const components = [
    <DragIntro next={nextScreen} />,
    <DragIntroSecond next={nextScreen} back={prevScreen} />,
    <DragInstall
      next={nextScreen}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
    />,
    <DragDelete
      next={nextScreen}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
    />,
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="card">{components[index]}</div>
    </DragDropContext>
  );
};

export default DragMain;
