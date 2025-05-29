import Colorizer from "../../color/ColorData";

function ColorPicker({ selectedColor, onColorSelect }) {
  const { colors } = Colorizer;
  const { borderColors } = Colorizer;
  return (
    <div className="flex p-2 border-1 border-gray-400 w-fit-content gap-5 rounded">
      {Object.keys(colors).map((color, index) => (
        <button
          key={index}
          type="button"
          className="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-115"
          style={{
            backgroundColor: colors[color],
            border:
              selectedColor === colors[color]
                ? `2px solid ${colors[color]}`
                : "none",
            boxShadow:
              selectedColor === colors[color]
                ? `inset 0 0 0 3px ${borderColors[color]}`
                : "none",
          }}
          onClick={() => onColorSelect(colors[color])}
        ></button>
      ))}
    </div>
  );
}

export default ColorPicker;
