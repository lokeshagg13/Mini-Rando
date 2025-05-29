import { useState, useEffect, useRef } from "react";
import Screen from "./components/Screen/Screen";
import Form from "./components/Form/Form";
import HeaderImage from "./images/header.png";

function App() {
  const screenRef = useRef();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (screenRef.current) {
        setScreenWidth(screenRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app p-4">
      <div className="flex items-center justify-center mb-4">
        <img src={HeaderImage} alt="MiniRando" width={300} />
      </div>
      <div className="flex flex-col items-center min-h-screen">
        <Screen ref={screenRef} />
        <div className="mt-8 w-90 md:w-3/5 lg:w-1/2">
        <Form />
        </div>
      </div>
      {/* <p className="text-center">Screen Width: {screenWidth}px</p> */}
    </div>
  );
}

export default App;
