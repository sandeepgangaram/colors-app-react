import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({ colors, deleteItem }) => {
  return (
    <div style={{ blockSize: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          deleteItem={() => deleteItem(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
