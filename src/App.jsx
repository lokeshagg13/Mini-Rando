import ControlBox from "./components/Control/ControlBox";
import HeaderImage from "./images/header.png";

function App() {
  return (
    <div className="app p-4">
      <div className="flex items-center justify-center mb-4">
        <img src={HeaderImage} alt="MiniRando" width={300} />
      </div>
      <ControlBox />
    </div>
  );
}

export default App;
