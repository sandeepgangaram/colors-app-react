import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const ColorPickerForm = ({ isPaletteFull, addColor, colors }) => {
  const [currentColor, setCurrentColor] = useState("purple");
  const [name, setName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  const colorChangeHanler = (val) => {
    setCurrentColor(val.hex);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const colorObject = {
      color: currentColor,
      name,
    };
    addColor(colorObject);
    setName("");
    // setCurrentColor("purple");
  };
  return (
    <div>
      <ChromePicker color={currentColor} onChangeComplete={colorChangeHanler} />
      <ValidatorForm onSubmit={handleSubmit}>
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
          style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
