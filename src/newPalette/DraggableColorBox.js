import React from "react";
import { styled } from "@mui/system";

const Main = styled("div")({
  inlineSize: "20%",
  blockSize: "25%",
  marginBlock: "0",
  marginInline: "auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBlockEnd: "-4px",
});
const DraggableColorBox = ({ color, name }) => {
  return <Main style={{ backgroundColor: color }}>{name}</Main>;
};

export default DraggableColorBox;
