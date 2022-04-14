import React from "react";
import colors from "./seedColors";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
const PaletteList = () => {
  return (
    <div>
      <h1>React Colors</h1>
      {colors.map((color) => (
        <MiniPalette {...color} />
      ))}
      ;
    </div>
  );
};

export default PaletteList;
