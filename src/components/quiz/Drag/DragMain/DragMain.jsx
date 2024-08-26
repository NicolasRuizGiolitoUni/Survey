import React, { useState } from "react";
import "./DragMain.css";
import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";
import DragIntroSecond from "../DragIntro/DragIntroSecond";
import DragDelete from "../DragDelete/DragDelete";

const DragMain = () => {
  const [index, setIndex] = useState(0);

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

  // Update the `next` and `back` props for DragInstall and DragDelete
  const components = [
    <DragIntro next={nextScreen} />,
    <DragIntroSecond next={nextScreen} back={prevScreen} />,
    <DragInstall next={nextScreen} back={prevScreen} />,
    <DragDelete next={nextScreen} />,
  ];

  return <div className="card">{components[index]}</div>;
};

export default DragMain;
