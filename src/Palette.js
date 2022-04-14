import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
const Palette = (props) => {
  const colorBoxes = props.colors.colors.map((color) => (
    <ColorBox background={color.color} name={color.name} />
  ));
  return (
    <div className="Palette">
      {/* Navbar */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
