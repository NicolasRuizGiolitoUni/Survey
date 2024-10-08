import React, { useState } from "react";

import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";
import DragIntroSecond from "../DragIntro/DragIntroSecond";
import DragDelete from "../DragDelete/DragDelete";
import { DragDropContext } from "react-beautiful-dnd";
import DragOS from "../DragOS/DragOS";
import DragChosen from "../DragChosen/DragChosen";
import DragQuestion from "../DragQuestion/DragQuestion";

const DragMain = ({ goToNextComponent, goToPreviousComponent, docId }) => {
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
      const movedApp = apps.find((app) => app.id === draggableId);
      setApps((prevApps) => prevApps.filter((app) => app.id !== draggableId));
      setTrashApps((prevTrashApps) => [...prevTrashApps, movedApp]);
    } else if (
      source.droppableId === "trash" &&
      destination.droppableId === "appsContainer"
    ) {
      const movedApp = trashApps.find((app) => app.id === draggableId);
      setTrashApps((prevTrashApps) =>
        prevTrashApps.filter((app) => app.id !== draggableId)
      );
      setApps((prevApps) => [...prevApps, movedApp]);
    } else if (
      source.droppableId === "appsContainer" &&
      destination.droppableId === "appsContainer"
    ) {
      const reorderedApps = Array.from(apps);
      const [movedApp] = reorderedApps.splice(source.index, 1);
      reorderedApps.splice(destination.index, 0, movedApp);
      setApps(reorderedApps);
    }
  };

  const components = [
    <DragIntro next={nextScreen} back={goToPreviousComponent} />,
    <DragIntroSecond next={nextScreen} back={prevScreen} />,
    <DragQuestion next={nextScreen} back={prevScreen} docId={docId} />,
    <DragOS next={nextScreen} back={prevScreen} docId={docId} />,
    <DragInstall
      next={nextScreen}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
      docId={docId}
    />,
    <DragDelete
      next={nextScreen}
      back={prevScreen}
      apps={apps}
      setApps={setApps}
      trashApps={trashApps}
      setTrashApps={setTrashApps}
      docId={docId}
    />,
    <DragChosen
      back={prevScreen}
      next={goToNextComponent}
      apps={apps}
      setApps={setApps}
      docId={docId}
    />,
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <>{components[index]}</>
    </DragDropContext>
  );
};

export default DragMain;
