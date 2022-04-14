import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
const NavBar = (props) => {
  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>level : {props.level}</span>
        <div className="slider">
          <Slider
            defaultValue={props.level}
            min={100}
            max={900}
            step={100}
            onChange={props.changeLevel}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
