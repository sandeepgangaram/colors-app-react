import React, { useState } from "react";
import { useParams } from "react-router-dom";
import seedColors from "./seedColors";

import { generatePalette } from "./colorHelpers";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
function findPalette(id) {
  return seedColors.find((palette) => {
    return palette.id === id;
  });
}

function gatherShades(palette, colorId) {
  let shades = [];
  let allColors = palette.colors;

  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter((color) => color.id === colorId)
    );
  }
  return shades.slice(1);
}

const SingleColorPalette = () => {
  const params = useParams();
  const palette = generatePalette(findPalette(params.paletteId));
  const shades = gatherShades(palette, params.colorId);

  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const changeLevel = (level) => {
    setLevel(level);
  };

  const changeColorFormat = (val) => {
    setFormat(val);
  };
  const colorBoxes = shades.map((color) => (
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
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
