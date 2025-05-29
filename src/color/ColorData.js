class Colorizer {
    static colors = {
        red: "rgb(255, 0, 0)",
        orange: "rgb(255, 165, 0)",
        yellow: "rgb(255, 255, 0)",
        green: "rgb(0, 128, 0)",
        blue: "rgb(0, 0, 255)",
        purple: "rgb(128, 0, 128)"
    }

    static borderColors = {
        red: "rgb(255, 255, 255)",
        orange: "rgb(240, 240, 240)",
        yellow: "rgb(128, 128, 128)",
        green: "rgb(255, 255, 255)",
        blue: "rgb(255, 255, 255)",
        purple: "rgb(255, 255, 255)"
    }

    static rgbToHsl(r, g, b) {
        // Normalize RGB values to a range of [0, 1]
        r /= 255;
        g /= 255;
        b /= 255;

        // Find the min and max values among r, g, and b
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        // Calculate Hue
        let h = 0;
        if (delta !== 0) {
            if (max === r) {
                h = ((g - b) / delta) % 6;
            } else if (max === g) {
                h = (b - r) / delta + 2;
            } else if (max === b) {
                h = (r - g) / delta + 4;
            }
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;

        // Calculate Lightness
        let l = (max + min) / 2;

        // Calculate Saturation
        let s = 0;
        if (delta !== 0) {
            s = delta / (1 - Math.abs(2 * l - 1));
        }

        // Convert to percentage and round
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        // Return HSL values
        return [h, s, l];
    }

    static hslToRgb(h, s, l) {
        // Convert HSL to the 0–1 range
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
        const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Secondary component
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }

        // Convert to 0–255 range and round
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return [r, g, b];
    }

    static getRGB(colorName) {
        return this.colors[colorName.toLowerCase()] || null;
    }

    static getRandomShade(rgb, shadeFactor = 0.2) {
        shadeFactor = shadeFactor / 2;
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const [h, s, l] = Colorizer.rgbToHsl(r, g, b);
        const signS = s > 50 ? -1 : 1;
        const signL = l > 50 ? -1 : 1;
        const adjustedS = Math.min(100, Math.max(0, s + signS * shadeFactor * 100 * Math.random()));
        const adjustedL = Math.min(100, Math.max(0, l + signL * shadeFactor * 100 * Math.random()));
        
        const [newR, newG, newB] = Colorizer.hslToRgb(h, parseInt(adjustedS), parseInt(adjustedL));
        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    static getRandomColor() {
        const colorNames = Object.keys(Colorizer.colors);
        return colorNames[Math.floor(Math.random() * colorNames.length)];
    }

    static getRandomColorShade(shadeFactor = 0.2) {
        const randomColor = Colorizer.getRandomColor();
        const originalRGB = Colorizer.getRGB(randomColor);
        const randomShade = Colorizer.getRandomShade(originalRGB, shadeFactor);
        return randomShade;
    }
}

export default Colorizer;