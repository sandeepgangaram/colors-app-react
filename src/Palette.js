import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import "./Palette.css";
import { generatePalette } from "./colorHelpers";

import PaletteFooter from "./PaletteFooter";

const Palette = ({ seedColors }) => {
  const params = useParams();

  function findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  }

  const palette = generatePalette(findPalette(params.id));

  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const changeLevel = (level) => {
    setLevel(level);
  };

  const changeColorFormat = (val) => {
    setFormat(val);
  };
  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      showMore
    />
  ));

  return (
    <div className="Palette">
      <NavBar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeColorFormat}
        showSlider
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default Palette;
