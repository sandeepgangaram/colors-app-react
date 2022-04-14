import React, { useState } from "react";
import ColorBox from "./ColorBox";

import NavBar from "./NavBar";

import "./Palette.css";

import seedColors from "./seedColors";

import { generatePalette } from "./colorHelpers";

import { useParams } from "react-router-dom";

function findPalette(id) {
  return seedColors.find((palette) => {
    return palette.id === id;
  });
}
const Palette = () => {
  const params = useParams();
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
    />
  ));

  return (
    <div className="Palette">
      <NavBar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeColorFormat}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <footer className="Palette-footer">
        {palette.paletteName}
        <span className="emoji">{palette.emoji}</span>
      </footer>
    </div>
  );
};

export default Palette;
