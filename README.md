# MiniRando 🎨🧪

**MiniRando** is a customizable pixel grid generator built with React. It creates dynamic images composed of either **uniform (uni) shades** or **multi-colored pixels**, with support for different screen resolutions and randomness levels.

## ✨ Features

- 🎨 **Color Modes**: Generate images with:
  - **Uni Color**: A base color spreads across the grid with slight randomized variations.
  - **Multi Color**: Every pixel has a randomized color.
  
- 🖼️ **Resolution Control**: Choose from common display resolutions:
  - 800x600 (SVGA)
  - 1280x720 (HD)
  - 1920x1080 (Full HD)
  - 3840x2160 (4K)

- 🎚️ **Randomness Factor**: Control the amount of variation in color (0 = no randomness, 1 = full randomness).

- 🔁 **Real-Time Regeneration**: Instantly regenerate pixel art based on new settings.

## 📦 Components Overview

### `ControlBox.jsx`
The main controller component:
- Holds global state (resolution, color mode, randomness, etc.)
- Computes grid dimensions
- Calls `generateColorArray` to create pixel data
- Passes data to `Screen` for rendering and `Form` for UI inputs

### `Form.jsx` (shown as `RForm`)
- Dropdown for selecting resolution
- Radio buttons for color mode
- Color picker for uni color mode
- Slider to adjust randomness
- Regenerate button to refresh the pixel grid

### `Screen.jsx`
- Displays the generated grid using the pixel data.
- Uses screen size and resolution to render each pixel at the correct size.

### `Colorizer.js`
- Utility for generating shades or colors based on randomness.
- Functions like `getRandomShade` and `getRandomColorShade` control pixel color variation.

### `Overlay.jsx`
- Shows a loading message while image data is being generated.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/minirando.git
cd minirando
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

---

## 🧠 How It Works

1. User selects resolution, color mode, and randomness.
2. On regeneration, `generatePixelData()` calculates pixel size and calls `generateColorArray()`.
3. A 2D array of colors is created based on the chosen color mode:

   * **Uni Color**: Starts from one color and diffuses variations across the grid.
   * **Multi Color**: Assigns a fully random shade to each pixel.
4. The `Screen` component renders this data as a responsive grid of colored divs or canvased pixels.

---

## 📸 Example Outputs

> (Optional) Add screenshots or GIFs here showing pixel grids in both color modes and different resolutions.

---

## 📁 Folder Structure

```
/src
  /components
    /ControlBox
    /Screen
    /Form
    /UI
  /color
    ColorData.js
```

---

## 🔧 Future Improvements

* Export generated grid as image
* Save presets for reuse
* Animation effects during regeneration
* Zoom and pan support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Contributing

Pull requests welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 👤 Author

Developed by [Lokesh Aggarwal](https://github.com/lokeshagg13).
