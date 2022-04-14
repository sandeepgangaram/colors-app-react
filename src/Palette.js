import React, { useState } from "react";
import ColorBox from "./ColorBox";

import NavBar from "./NavBar";

import "./Palette.css";

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const changeLevel = (level) => {
    setLevel(level);
  };

  const changeColorFormat = (val) => {
    setFormat(val);
  };
  const colorBoxes = props.palette.colors[level].map((color) => (
    <ColorBox background={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <NavBar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeColorFormat}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
