import React from "react";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";
import sizes from "../breakpoints";

const Main = styled("div")({
  inlineSize: "20%",
  blockSize: "25%",
  marginBlock: "0",
  marginInline: "auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBlockEnd: "-7px",
  "&:hover .delete-icon": {
    color: "white",
    transform: "scale(1.25)",
  },
  [sizes.down("lg")]: {
    inlineSize: "25%",
    blockSize: "25%",
  },
  [sizes.down("md")]: {
    inlineSize: "50%",
    blockSize: "10%",
  },
  [sizes.down("sm")]: {
    inlineSize: "100%",
    blockSize: "5%",
  },
  "& .box-content": {
    position: "absolute",
    inlineSize: "100%",
    insetInlineStart: "0px",
    insetBlockEnd: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  "& .box-content.light-text": {
    color: "white",
  },
  "& .delete-icon": {
    transition: "all 0.3s ease-in-out",
  },
});
const DraggableColorBox = SortableElement(({ color, name, deleteItem }) => {
  const isDark = chroma(color).luminance() <= 0.08;

  return (
    <Main style={{ backgroundColor: color }}>
      <div className={`box-content ${isDark && "light-text"}`}>
        <span>{name}</span>

        <DeleteIcon className="delete-icon" onClick={deleteItem} />
      </div>
    </Main>
  );
});

export default DraggableColorBox;
