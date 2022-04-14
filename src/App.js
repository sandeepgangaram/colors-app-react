import Palette from "./Palette";

import { Routes, Route, Link } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./newPalette/NewPaletteForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaletteList />} />
        <Route path="/palette/new" element={<NewPaletteForm />} />
        <Route path="/palette/:id" element={<Palette />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
