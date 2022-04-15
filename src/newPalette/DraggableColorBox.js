import React from "react";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
const Main = styled("div")({
  inlineSize: "20%",
  blockSize: "25%",
  marginBlock: "0",
  marginInline: "auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBlockEnd: "-4px",
  "&:hover .delete-icon": {
    color: "white",
    transform: "scale(1.25)",
  },
  "& #box-content": {
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
  "& .delete-icon": {
    transition: "all 0.3s ease-in-out",
  },
});
const DraggableColorBox = ({ color, name, deleteItem }) => {
  return (
    <Main style={{ backgroundColor: color }}>
      <div id="box-content">
        <span>{name}</span>

        <DeleteIcon className="delete-icon" onClick={deleteItem} />
      </div>
    </Main>
  );
};

export default DraggableColorBox;
