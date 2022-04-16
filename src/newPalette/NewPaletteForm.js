import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrayMoveImmutable } from "array-move";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";

import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

import {
  Main,
  DrawerHeader,
  Container,
  ButtonContainer,
} from "./styles/NewPaletteFormStyles";

import { DRAWER_WIDTH } from "./styles/constants";
const drawerWidth = DRAWER_WIDTH;

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

  const savePaletteHandler = (palette) => {
    const name = palette.name;
    const id = name.toLocaleLowerCase().replace(/ /g, "-");
    const newPalette = {
      paletteName: name,
      emoji: palette.emoji,
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
