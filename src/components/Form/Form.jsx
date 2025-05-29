// Resolutions
// Uni Color (color shade)/MultiColor
// Randomness
import Form from "react-bootstrap/Form";

import ColorPicker from "./ColorPicker";

function RForm({
  resolution,
  setResolution,
  colorMode,
  setColorMode,
  selectedColor,
  setSelectedColor,
  randomnessFactor,
  setRandomnessFactor,
  onRegenerate,
}) {
  const handleColorSelect = (rgb) => {
    setSelectedColor(rgb);
  };

  return (
    <form className="custom-form">
      {/* Regenerate Button */}
      <div className="mb-6">
        <div>
          <button
            type="button"
            className="w-100 p-4 rounded bg-primary text-white text-xl font-medium hover:bg-primary cursor-pointer"
            onClick={onRegenerate}
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* Resolutions Dropdown */}
      <div className="mb-6">
        <div>
          <div className="flex flex-col gap-10">
            <div className="text-xl">Resolution</div>
            <select
              size="sm"
              className="border border-gray-400 p-2 rounded-md text-lg w-100"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            >
              <option value="3840x2160">4K (3840x2160)</option>
              <option value="1920x1080">2K (1920x1080)</option>
              <option value="1280x720">HD (1280x720)</option>
              <option value="800x600">SVGA (800x600)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Mode Radio Buttons */}
      <div className="mb-6">
        <div>
          <div className="flex flex-col gap-10">
            <div className="text-xl">Color Mode</div>
            <div className="flex flex-col gap-5">
              <Form.Check
                type="radio"
                label="Multi Color"
                name="colorMode"
                value="multi"
                checked={colorMode === "multi"}
                onChange={() => setColorMode("multi")}
              />
              <div className="flex flex-col gap-5">
                <Form.Check
                  type="radio"
                  label="Uni Color"
                  name="colorMode"
                  value="uni"
                  checked={colorMode === "uni"}
                  onChange={() => setColorMode("uni")}
                />
                {colorMode === "uni" && (
                  <ColorPicker
                    selectedColor={selectedColor}
                    onColorSelect={handleColorSelect}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Randomness Factor Slider */}
      <div className="mb-6">
        <div>
          <div className="flex flex-col gap-10">
            <div className="text-xl">
              Randomness Factor &nbsp;
              <span className="text-lg">({randomnessFactor})</span>
            </div>
            <div className="flex flex-col">
              <Form.Range
                min={0}
                max={1}
                step={0.01}
                value={randomnessFactor}
                onChange={(e) => setRandomnessFactor(e.target.value)}
              />
              <div className="flex justify-between">
                <span>0</span>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RForm;
