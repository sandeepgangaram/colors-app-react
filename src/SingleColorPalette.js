import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { generatePalette } from "./colorHelpers";

function findPalette(seedColors, id) {
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

const SingleColorPalette = ({ seedColors }) => {
  const navigate = useNavigate();
  const params = useParams();
  const palette = generatePalette(findPalette(seedColors, params.paletteId));
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
      key={color.name}
      id={color.id}
    />
  ));

  return (
    <div className="SingleColorPalette Palette">
      <NavBar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeColorFormat}
      />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <a className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </a>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
