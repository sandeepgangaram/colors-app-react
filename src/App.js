import Palette from "./Palette";

import { Routes, Route, Link } from "react-router-dom";
import PaletteList from "./PaletteList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaletteList />} />
        <Route path="/palette/:id" element={<Palette />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<h1>Single Color Page</h1>}
        />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
