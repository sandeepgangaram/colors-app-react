import React from "react";
import colors from "./seedColors";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Main = styled("main")({
  backgroundColor: "blue",
  minBlockSize: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
});

const Section = styled("section")({
  inlineSize: "60%",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
});

const Nav = styled("Nav")({
  display: "flex",
  inlineSize: "100%",
  justifyContent: "space-between",
  color: "white",
});

const Div = styled("div")({
  boxSizing: "border-box",
  inlineSize: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3,30%)",
  gridGap: "5%",
});

const PaletteList = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Section>
        <Nav>
          <h1>React Colors</h1>
        </Nav>
        <Div>
          {colors.map((color) => (
            <MiniPalette
              {...color}
              onClick={() => navigate(`/palette/${color.id}`)}
            />
          ))}
        </Div>
      </Section>
    </Main>
  );
};

export default PaletteList;
