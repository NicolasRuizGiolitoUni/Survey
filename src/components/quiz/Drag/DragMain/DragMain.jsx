import React, { useState } from "react";
import "./DragMain.css";
import DragIntro from "../DragIntro/DragIntro";
import DragInstall from "../DragInstall/DragInstall";

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

  const components = [
    <DragIntro next={nextScreen} />,
    <DragInstall next={nextScreen} back={prevScreen} />,
  ];

  return <div className="card">{components[index]}</div>;
};

export default DragMain;
