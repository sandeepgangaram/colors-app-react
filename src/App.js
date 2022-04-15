import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./newPalette/NewPaletteForm";
import seedColors from "./seedColors";
import Palette from "./Palette";

function App() {
  const [allPalette, setAllPalette] = useState(seedColors);
  const savePalette = (newPalette) => {
    setAllPalette((prev) => [...prev, newPalette]);
    console.log(newPalette);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<PaletteList seedColors={allPalette} />} />
        <Route
          path="/palette/new"
          element={<NewPaletteForm savePalette={savePalette} />}
        />
        <Route
          path="/palette/:id"
          element={<Palette seedColors={allPalette} />}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette seedColors={allPalette} />}
        />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
