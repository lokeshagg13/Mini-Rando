import { useEffect, useRef } from "react";

function Screen({ pixelData, setLoadingStatus }) {
  const canvasRef = useRef(null);
  // For aborting a call to drawPixels if a new execution begins
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Declare the drawPixels function inside useEffect
    const drawPixels = async (signal) => {
      const canvas = canvasRef.current;
      if (!canvas || !pixelData || !pixelData.colorArray) return;

      const ctx = canvas.getContext("2d");
      const { numPixelX, numPixelY, pixelWidth, pixelHeight, colorArray } =
        pixelData;

      const totalTime = 5000;
      const delay = totalTime / numPixelY;

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setLoadingStatus("Generating Image ...");
      try {
        for (let rowIndex = 0; rowIndex < numPixelY; rowIndex++) {
          for (let colIndex = 0; colIndex < numPixelX; colIndex++) {
            if (signal.aborted) return; // Stop execution if aborted
            ctx.fillStyle = colorArray[rowIndex][colIndex];
            ctx.fillRect(
              colIndex * pixelWidth,
              rowIndex * pixelHeight,
              pixelWidth,
              pixelHeight
            );
          }
          await new Promise((resolve) => {
            const timeout = setTimeout(resolve, delay);
            signal.addEventListener("abort", () => clearTimeout(timeout));
          });
        }
      } catch (error) {
        // Drawing aborted, just exit
      } finally {
        setLoadingStatus(false);
      }
    };

    // Cancel the previous operation if running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current operation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    drawPixels(controller.signal);

    // Cleanup on unmount or next render
    return () => {
      controller.abort();
    };
  }, [pixelData]);

  return (
    <canvas
      ref={canvasRef}
      width={pixelData.numPixelX * pixelData.pixelWidth || "100"}
      height={pixelData.numPixelY * pixelData.pixelHeight || "100"}
      className="border-1 bg-white shadow-md"
    ></canvas>
  );
}

export default Screen;
