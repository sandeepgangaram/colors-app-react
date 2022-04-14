import React from "react";
import colors from "./seedColors";
import { Link } from "react-router-dom";
const PaletteList = () => {
  return (
    <div>
      <h1>React Colors</h1>
      {colors.map((color) => (
        <p>
          <Link to={`palette/${color.id}`}>{color.paletteName}</Link>
        </p>
      ))}
      ;
    </div>
  );
};

export default PaletteList;
