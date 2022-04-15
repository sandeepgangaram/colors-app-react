import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function PaletteMetaForm({
  seedColors,
  savePaletteHandler,
  toggleForm,
}) {
  const [paletteName, setPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return seedColors.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  const [stage, setStage] = useState("form");

  const paletteNameChangeHandler = (e) => {
    setPaletteName(e.target.value);
  };

  const showEmoji = () => {
    setStage("emoji");
  };

  const saveEmoji = (emoji) => {
    const palette = {
      name: paletteName,
      emoji: emoji.native,
    };
    savePaletteHandler(palette);
  };
  return (
    <>
      <Dialog open={stage === "emoji"} onClose={toggleForm}>
        <DialogTitle>Pick A Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onClick={saveEmoji} />
      </Dialog>
      <Dialog open={stage === "form"} onClose={toggleForm}>
        <DialogTitle>Choose A Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmoji}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure its
              unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              fullWidth
              margin="normal"
              value={paletteName}
              onChange={paletteNameChangeHandler}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Palette Name is required",
                "Palette Name Must Be Unique",
              ]}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={toggleForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
