import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("aside")({
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  ":hover": {
    cursor: "pointer",
  },
});
const Colors = styled("div")({
  backgroundColor: "#dae1e4",
  blockSize: "150px",
  inlineSize: "100%",
  borderRadius: "5px",
  overflow: "hidden",
});
const TinyPalatte = styled("div")({
  blockSize: "25%",
  inlineSize: "20%",
  display: "inline-block",
  marginInline: "auto",
  marginBottom: "-4px",
});

const Text = styled("h5")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0",
  color: "black",
  paddingBlockStart: "0.5rem",
  fontSize: "1rem",
  position: "relative",
});

const Emoji = styled("span")({
  marginInlineStart: "0.5rem",
  fontSize: "1.5rem",
});

const MiniPalette = ({ emoji, id, paletteName, colors }) => {
  const miniColorBoxes = colors.map((color) => (
    <TinyPalatte
      style={{ backgroundColor: `${color.color}` }}
      key={color.name}
    ></TinyPalatte>
  ));

  return (
    <MainContainer>
      <Colors>{miniColorBoxes}</Colors>
      <Text>
        {paletteName}
        <Emoji>{emoji}</Emoji>
      </Text>
    </MainContainer>
  );
};

export default MiniPalette;
