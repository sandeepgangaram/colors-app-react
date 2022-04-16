import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./newPalette/NewPaletteForm";
import seedColors from "./seedColors";
import Palette from "./Palette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <div className="page">
                  <PaletteList
                    deletePalette={deletePalette}
                    seedColors={allPalette}
                  />
                </div>
              }
            />
            <Route
              path="/palette/new"
              element={
                <div className="page">
                  <NewPaletteForm
                    savePalette={savePalette}
                    seedColors={allPalette}
                  />
                </div>
              }
            />
            <Route
              path="/palette/:id"
              element={
                <div className="page">
                  <Palette seedColors={allPalette} />
                </div>
              }
            />
            <Route
              path="/palette/:paletteId/:colorId"
              element={
                <div className="page">
                  <SingleColorPalette seedColors={allPalette} />
                </div>
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
