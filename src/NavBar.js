import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const NavBar = (props) => {
  const { level, changeLevel, handleChange } = props;
  const [format, setFormat] = useState("hex");
  const changeHandler = (e) => {
    setFormat(e.target.value);
    handleChange(e.target.value);
  };
  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>level : {props.level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onChange={changeLevel}
          />
        </div>
      </div>
      <div className="select-container">
        <Select value={format} onChange={changeHandler}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
};

export default NavBar;
