import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./newPalette/NewPaletteForm";
import seedColors from "./seedColors";
import Palette from "./Palette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Page from "./Page";
import "./App.css";

function App() {
  const location = useLocation();
  const savedColors = JSON.parse(window.localStorage.getItem("palett"));

  const [allPalette, setAllPalette] = useState(savedColors || seedColors);
  const savePalette = (newPalette) => {
    setAllPalette((prev) => [...prev, newPalette]);
  };

  useEffect(() => {
    window.localStorage.setItem("palett", JSON.stringify(allPalette));
  }, [allPalette]);

  const deletePalette = (id) => {
    setAllPalette((prev) => prev.filter((color) => color.id !== id));
  };

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Page>
                  <PaletteList
                    deletePalette={deletePalette}
                    seedColors={allPalette}
                  />
                </Page>
              }
            />
            <Route
              path="/palette/new"
              element={
                <Page>
                  <NewPaletteForm
                    savePalette={savePalette}
                    seedColors={allPalette}
                  />
                </Page>
              }
            />
            <Route
              path="/palette/:id"
              element={
                <Page>
                  <Palette seedColors={allPalette} />
                </Page>
              }
            />
            <Route
              path="/palette/:paletteId/:colorId"
              element={
                <Page>
                  <SingleColorPalette seedColors={allPalette} />
                </Page>
              }
            />
          </Routes>
          {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
