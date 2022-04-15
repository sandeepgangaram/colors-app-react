import React from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const MainContainer = styled("aside")({
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "0.5rem",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",

  ":hover .delete-icon": {
    opacity: "1",
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

const Container = styled("span")({
  marginInlineStart: "0.5rem",
  fontSize: "1.5rem",
  "& .delete-icon": {
    color: "white",
    backgroundColor: "#ee3d30",
    inlineSize: "20px",
    blockSize: "20px",
    position: "absolute",
    insetInlineEnd: "0px",
    insetBlockStart: "0px",
    padding: "5px",
    opacity: "0",
    transition: "all 0.3s ease-in-out",
  },
});

const MiniPalette = ({ emoji, id, paletteName, colors, deletePalette }) => {
  const navigate = useNavigate();
  const deletePaletteHandler = (e) => {
    e.stopPropagation();
    deletePalette(id);
  };
  const miniColorBoxes = colors.map((color) => (
    <TinyPalatte
      style={{ backgroundColor: `${color.color}` }}
      key={color.name}
    ></TinyPalatte>
  ));

  return (
    <MainContainer onClick={() => navigate(`/palette/${id}`)}>
      <Container>
        <DeleteIcon className="delete-icon" onClick={deletePaletteHandler} />
      </Container>
      <Colors>{miniColorBoxes}</Colors>
      <Text>
        {paletteName}
        <Emoji>{emoji}</Emoji>
      </Text>
    </MainContainer>
  );
};

export default MiniPalette;
