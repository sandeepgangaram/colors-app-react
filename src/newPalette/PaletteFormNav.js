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

import PaletteMetaForm from "./PaletteMetaForm";
const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
});

const PaletteFormNav = ({
  seedColors,
  savePaletteHandler,
  handleDrawerOpen,
  open,
}) => {
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette{" "}
          </Typography>
        </Toolbar>
        <Div>
          <PaletteMetaForm
            seedColors={seedColors}
            savePaletteHandler={(val) => savePaletteHandler(val)}
          >
            Open Dialog
          </PaletteMetaForm>
          <Link to={{ pathname: "/" }}>
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </Div>
      </AppBar>
    </>
  );
};

export default PaletteFormNav;
