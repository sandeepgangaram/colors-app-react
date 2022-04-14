import React, { useState } from "react";
import ColorBox from "./ColorBox";

import NavBar from "./NavBar";

import "./Palette.css";

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const changeLevel = (level) => {
    setLevel(level);
  };
  const colorBoxes = props.palette.colors[level].map((color) => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  return (
    <div className="Palette">
      <NavBar level={level} changeLevel={changeLevel} />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
