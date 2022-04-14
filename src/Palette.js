import React, { useState } from "react";
import ColorBox from "./ColorBox";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

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
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onChange={changeLevel}
        />
      </div>
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
