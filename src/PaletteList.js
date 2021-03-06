import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { styled } from "@mui/system";
import bg from "./newPalette/styles/bg.svg";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";
import MiniPalette from "./MiniPalette";
import sizes from "./breakpoints";
import { Button } from "@mui/material";

const Main = styled("main")({
  backgroundColor: "blue",
  backgroundImage: `url(${bg})`,
  // background by svgbackgrounds.com
  minBlockSize: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",

  // "& .fade-exit": {
  //   opacity: "1",
  // },

  // "& .fade-exit-active": {
  //   opacity: "0",
  //   transition: "opacity 500ms ease-out",
  // },

  "& button": {
    alignSelf: "center",
    color: "white",
  },
});

const Section = styled("section")({
  inlineSize: "50%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  [sizes.down("xl")]: {
    inlineSize: "80%",
  },
  [sizes.down("xs")]: {
    inlineSize: "70%",
  },
});

const NavContainer = styled("nav")({
  display: "flex",
  inlineSize: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  "& a": {
    color: "white",
  },
});

const Div = styled("div")({
  boxSizing: "border-box",
  inlineSize: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3,30%)",
  gridGap: "5%",
  [sizes.down("md")]: {
    gridTemplateColumns: "repeat(2,50%)",
  },
  [sizes.down("xs")]: {
    gridTemplateColumns: "repeat(1,100%)",
    gridGap: "1%",
  },
});

const PaletteList = ({ seedColors, deletePalette }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [paletteId, setPaletteId] = useState("");

  const noColors = seedColors.length === 0;

  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
    setPaletteId("");
  };

  const deleteDialog = (id) => {
    setOpenDialog(true);
    setPaletteId(id);
  };

  const deletePaletteId = () => {
    deletePalette(paletteId);
    setOpenDialog(false);
  };
  return (
    <Main>
      <Section>
        <NavContainer>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </NavContainer>
        {noColors && <Button>Refresh to Restore Colors</Button>}

        <Div>
          <TransitionGroup component={null}>
            {seedColors.map((color) => (
              <CSSTransition key={color.id} timeout={500} classNames="fade">
                <MiniPalette
                  {...color}
                  // deletePalette={deletePalette}
                  deletePalette={deleteDialog}
                  key={color.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Div>
      </Section>
      <Dialog
        open={openDialog}
        aria-label="delete-dialog-title"
        onClose={toggleDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
        <List>
          <ListItem button onClick={deletePaletteId}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={toggleDialog}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </Main>
  );
};

export default PaletteList;
