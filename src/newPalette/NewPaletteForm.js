import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import { arrayMoveImmutable } from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Container = styled("div")({
  inlineSize: "90%",
  blockSize: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainer = styled("div")({
  inlineSize: "100%",

  "& button": {
    inlineSize: "50%",
    marginBlockStart: "1rem",
  },
});

const NewPaletteForm = (props) => {
  const navigate = useNavigate();
  const [colors, setColors] = useState(props.seedColors[0].colors);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const addColor = (colorObject) => {
    setColors((prev) => [...prev, colorObject]);
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  const clearPalette = () => {
    setColors([]);
  };

  const isPaletteFull = colors.length >= 20;

  const addRandomColor = () => {
    const allColors = props.seedColors.map((c) => c.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    setColors((prev) => [...prev, allColors[rand]]);
  };

  const savePaletteHandler = (paletteName) => {
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

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        seedColors={props.seedColors}
        savePaletteHandler={(name) => savePaletteHandler(name)}
      />
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
        <Container>
          <Typography variant="h4">Design Your Palette</Typography>
          <ButtonContainer>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>
          </ButtonContainer>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            addColor={(val) => addColor(val)}
            colors={colors}
          />
        </Container>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          deleteItem={(colorName) => removeColor(colorName)}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
