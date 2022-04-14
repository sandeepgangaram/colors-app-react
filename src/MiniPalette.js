import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("aside")({
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  position: "relative",
  overflow: "hidden",
  ":hover": {
    cursor: "pointer",
  },
});
const Colors = styled("div")({
  backgroundColor: "grey",
  display: "flex",
});
const TinyPalatte = styled("div")({
  color: "white",
  backgroundColor: "grey",
  padding: 8,
  borderRadius: 4,
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
  return (
    <MainContainer>
      <Colors />
      <Text>
        {paletteName}
        <Emoji>{emoji}</Emoji>
      </Text>
    </MainContainer>
  );
};

export default MiniPalette;
