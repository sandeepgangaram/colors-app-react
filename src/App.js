import Palette from "./Palette";
import seedColors from "./seedColors";

import { generatePalette } from "./colorHelpers";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  console.log(generatePalette(seedColors[4]));
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Palette Home</h1>} />
        <Route path="/palette/:id" element={<h1>Individual Palette</h1>} />
      </Routes>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
      </div> */}
    </>
  );
}

export default App;
