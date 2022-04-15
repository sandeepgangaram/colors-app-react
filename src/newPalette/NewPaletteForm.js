import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";

import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    blockSize: "calc(100vh - 64px)",
    // overflow: "hidden",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NewPaletteForm = (props) => {
  const navigate = useNavigate();
  const [currentColor, setCurrentColor] = useState("purple");
  const [colors, setColors] = useState([]);
  const [name, setName] = useState("");
  const [paletteName, setPaletteName] = useState("");
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.seedColors.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const colorChangeHanler = (val) => {
    setCurrentColor(val.hex);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const paletteNameChangeHandler = (e) => {
    setPaletteName(e.target.value);
  };

  const addColor = () => {
    const colorObject = {
      color: currentColor,
      name,
    };
    setColors((prev) => [...prev, colorObject]);
  };

  const savePaletteHandler = () => {
    const name = paletteName;
    const id = name.toLocaleLowerCase().replace(/ /g, "-");
    const newPalette = {
      paletteName: name,
      id,
      colors: colors,
    };
    props.savePalette(newPalette);
    navigate({ pathname: "/" });
  };

  const removeColor = (colorName) => {
    setColors((prev) => prev.filter((color) => color.name !== colorName));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={savePaletteHandler}>
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
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={colorChangeHanler}
        />
        <ValidatorForm onSubmit={addColor}>
          <TextValidator
            value={name}
            onChange={nameChangeHandler}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Color Name is required",
              "Color Name Must Be Unique",
              "Color already used",
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: `${currentColor}` }}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {colors.map((color) => (
          <DraggableColorBox
            key={color.name}
            color={color.color}
            name={color.name}
            deleteItem={() => removeColor(color.name)}
          />
        ))}
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
