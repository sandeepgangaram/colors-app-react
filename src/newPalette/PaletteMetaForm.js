import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function PaletteMetaForm({ seedColors, savePaletteHandler }) {
  const [paletteName, setPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return seedColors.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  const [open, setOpen] = useState(true);

  const paletteNameChangeHandler = (e) => {
    setPaletteName(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Choose A Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => savePaletteHandler(paletteName)}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
