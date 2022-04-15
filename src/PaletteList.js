import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { styled } from "@mui/system";
import sizes from "./breakpoints";
import bg from "./newPalette/styles/bg.svg";

const Main = styled("main")({
  backgroundColor: "blue",
  backgroundImage: `url(${bg})`,
  minBlockSize: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

const Section = styled("section")({
  inlineSize: "50%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  [sizes.down("xl")]: {
    inlineSize: "80%",
  },
  [sizes.down("xs")]: {
    inlineSize: "70%",
  },
});

const Nav = styled("Nav")({
  display: "flex",
  inlineSize: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  "& a": {
    color: "white",
  },
});

const Div = styled("div")({
  boxSizing: "border-box",
  inlineSize: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3,30%)",
  gridGap: "5%",
  [sizes.down("md")]: {
    gridTemplateColumns: "repeat(2,50%)",
  },
  [sizes.down("xs")]: {
    gridTemplateColumns: "repeat(1,100%)",
    gridGap: "1%",
  },
});

const PaletteList = ({ seedColors, deletePalette }) => {
  return (
    <Main>
      <Section>
        <Nav>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Nav>
        <Div>
          {seedColors.map((color) => (
            <MiniPalette
              {...color}
              deletePalette={deletePalette}
              key={color.id}
            />
          ))}
        </Div>
      </Section>
    </Main>
  );
};

export default PaletteList;
