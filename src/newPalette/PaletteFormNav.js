import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PaletteMetaForm from "./PaletteMetaForm";
import { DRAWER_WIDTH } from "./styles/constants";

const drawerWidth = DRAWER_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  justifyContent: "center",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Div = styled("div")({
  position: "absolute",
  insetInlineEnd: "0",
  display: "flex",
  alignItems: "center",
  marginInlineEnd: "1rem",

  "& button": {
    marginInlineEnd: "1rem",
  },
  "& a": { textDecoration: "none" },
});

const PaletteFormNav = ({
  seedColors,
  savePaletteHandler,
  handleDrawerOpen,
  open,
}) => {
  const [formShowing, setFormShowing] = useState(false);
  const toggleForm = () => {
    setFormShowing((prev) => !prev);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <AddBoxIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette{" "}
          </Typography>
        </Toolbar>
        <Div>
          <Link to={{ pathname: "/" }}>
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
          <Button variant="contained" color="primary" onClick={toggleForm}>
            Save
          </Button>
        </Div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          toggleForm={toggleForm}
          seedColors={seedColors}
          savePaletteHandler={(val) => savePaletteHandler(val)}
        />
      )}
    </>
  );
};

export default PaletteFormNav;
