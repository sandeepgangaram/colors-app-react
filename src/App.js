import Palette from "./Palette";

import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Palette Home</h1>} />
        <Route path="/palette/:id" element={<Palette />} />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
