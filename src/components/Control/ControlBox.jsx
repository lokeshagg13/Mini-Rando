import { useEffect, useRef, useState } from "react";
import Colorizer from "../../color/ColorData";
import Screen from "../Screen/Screen";
import Form from "../Form/Form";
import Overlay from "../UI/overlay";

function ControlBox() {
  const screenRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [resolution, setResolution] = useState("800x600");
  const [colorMode, setColorMode] = useState("uni");
  const [selectedColor, setSelectedColor] = useState(Colorizer.colors.red);
  const [randomnessFactor, setRandomnessFactor] = useState(1);
  const [pixelData, setPixelData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const generateColorArray = async (numPixelX, numPixelY) => {
    let colorArray;
    if (colorMode === "uni") {
      colorArray = [[selectedColor]];
      for (let c = 1; c < numPixelX; c++) {
        colorArray[0].push(
          Colorizer.getRandomShade(colorArray[0][c - 1], randomnessFactor)
        );
      }
      for (let r = 1; r < numPixelY; r++) {
        colorArray.push([]);
        colorArray[r].push(
          Colorizer.getRandomShade(colorArray[r - 1][0], randomnessFactor)
        );
        for (let c = 1; c < numPixelX; c++) {
          colorArray[r].push(
            Colorizer.getRandomShade(colorArray[r][c - 1], randomnessFactor)
          );
        }
      }
    } else {
      colorArray = [];
      for (let r = 0; r < numPixelY; r++) {
        colorArray.push([]);
        for (let c = 0; c < numPixelX; c++) {
          colorArray[r].push(Colorizer.getRandomColorShade(randomnessFactor));
        }
      }
    }
    return colorArray;
  };

  // Define the generation logic without depending on form elements
  const generatePixelData = async () => {
    const numPixelX = parseInt(resolution.split("x")[0]);
    const numPixelY = parseInt(resolution.split("x")[1]);
    const pixelWidth = screenWidth / numPixelX;
    const pixelHeight = screenHeight / numPixelY;
    setLoadingStatus("Generating Data ...");
    const colorArray = await generateColorArray(numPixelX, numPixelY);
    setLoadingStatus(false);

    setPixelData({
      numPixelX: numPixelX,
      numPixelY: numPixelY,
      pixelWidth: pixelWidth,
      pixelHeight: pixelHeight,
      colorArray: colorArray,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (screenRef.current) {
        setScreenWidth(screenRef.current.offsetWidth);
        setScreenHeight(screenRef.current.offsetHeight);
      }
    };

    handleResize();
    generatePixelData();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth, screenHeight]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div ref={screenRef} className="w-90 md:w-3/5 lg:w-1/2 h-100">
        <Screen pixelData={pixelData} setLoadingStatus={setLoadingStatus} />
      </div>
      <div className="mt-8 w-90 md:w-3/5 lg:w-1/2">
        <Form
          resolution={resolution}
          setResolution={setResolution}
          colorMode={colorMode}
          setColorMode={setColorMode}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          randomnessFactor={randomnessFactor}
          setRandomnessFactor={setRandomnessFactor}
          onRegenerate={generatePixelData} // Only regenerate when this is triggered
        />
      </div>
      {loadingStatus && <Overlay text={loadingStatus} />}
    </div>
  );
}

export default ControlBox;
