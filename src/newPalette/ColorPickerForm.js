import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Container = styled("div")({
  inlineSize: "100%",
  marginBlockStart: "2rem",
});

const ButtonContainer = styled("div")({
  inlineSize: "100%",
  "& button": {
    inlineSize: "100%",
    fontSize: "1.25rem",
    marginBlockStart: "0.5rem",
  },
});
const InputContainer = styled("div")({
  inlineSize: "100% !important",
  "& input": {
    inlineSize: "100% !important",
  },
});

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
      <Container>
        <ChromePicker
          color={currentColor}
          onChangeComplete={colorChangeHanler}
        />
      </Container>
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <InputContainer>
          <TextValidator
            margin="normal"
            variant="filled"
            fullWidth
            placeholder="Color Name"
            value={name}
            onChange={nameChangeHandler}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Color Name is required",
              "Color Name Must Be Unique",
              "Color already used",
            ]}
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
            disabled={isPaletteFull}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ButtonContainer>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
