import Palette from "./Palette";
import seedColors from "./seedColors";
function App() {
  return (
    <div>
      <Palette colors={{ ...seedColors[4] }} />
    </div>
  );
}

export default App;
