import React, { useState } from "react";

import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";
import DragIntroSecond from "../DragIntro/DragIntroSecond";
import DragDelete from "../DragDelete/DragDelete";

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

  return <>{components[index]}</>;
};

export default DragMain;
