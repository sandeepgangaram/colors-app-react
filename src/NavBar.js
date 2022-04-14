import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { level, changeLevel, handleChange } = props;
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const changeHandler = (e) => {
    setFormat(e.target.value);
    handleChange(e.target.value);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      key="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <header className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={2300}
        onClose={handleClose}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        action={action}
        ContentProps={{ "aria-describedby": "message-id" }}
      />
    </header>
  );
};

export default NavBar;
