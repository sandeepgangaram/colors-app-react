import Palette from "./Palette";

import { Routes, Route, Link } from "react-router-dom";
import PaletteList from "./PaletteList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaletteList />} />
        <Route path="/palette/:id" element={<Palette />} />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
