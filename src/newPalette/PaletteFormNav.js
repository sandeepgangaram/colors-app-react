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

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
  justifyContent: "space-evenly",
});

const PaletteFormNav = ({
  seedColors,
  savePaletteHandler,
  handleDrawerOpen,
  open,
}) => {
  const [paletteName, setPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return seedColors.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const paletteNameChangeHandler = (e) => {
    setPaletteName(e.target.value);
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette{" "}
          </Typography>
        </Toolbar>
        <Div>
          <ValidatorForm onSubmit={() => savePaletteHandler(paletteName)}>
            <TextValidator
              label="Palette Name"
              value={paletteName}
              onChange={paletteNameChangeHandler}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Palette Name is required",
                "Palette Name Must Be Unique",
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
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
