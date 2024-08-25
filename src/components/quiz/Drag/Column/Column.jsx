import React from "react";
import "./Column.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Apps from "../AppsComponents/Apps";

const Column = ({ apps }) => {
  return (
    <div className="container">
      <SortableContext items={apps} strategy={verticalListSortingStrategy}>
        {apps.map((app) => (
          <Apps id={app.id} name={app.name} key={app.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
