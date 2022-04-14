import React from "react";
import colors from "./seedColors";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { styled } from "@mui/system";

const Main = styled("main")({
  backgroundColor: "blue",
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
  border: "1px solid white",
});

const Nav = styled("Nav")({
  display: "flex",
  inlineSize: "100%",
  justifyContent: "space-between",
  color: "white",
});

const H1 = styled("h1")({});

const Div = styled("div")({
  boxSizing: "border-box",
  inlineSize: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3,30%)",
  gridGap: "5%",
});

const PaletteList = () => {
  return (
    <Main>
      <Section>
        <Nav>
          <H1>React Colors</H1>
        </Nav>
        <Div>
          {colors.map((color) => (
            <MiniPalette {...color} />
          ))}
        </Div>
      </Section>
    </Main>
  );
};

export default PaletteList;
