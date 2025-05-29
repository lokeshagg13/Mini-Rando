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

    static getRGB(colorName) {
        return this.colors[colorName.toLowerCase()] || null;
    }

    static getRandomShade(rgb, shadeFactor = 0.2) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const isLighter = Math.random() > 0.5;

        const adjustColor = (channel) => {
            const adjustment = Math.random() * 255 * shadeFactor;
            return Math.min(255, Math.max(0, channel + (isLighter ? adjustment : -adjustment)));
        };

        const newR = Math.round(adjustColor(r));
        const newG = Math.round(adjustColor(g));
        const newB = Math.round(adjustColor(b));

        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    static getRandomColor() {
        const colorNames = Object.keys(this.colors);
        return colorNames[Math.floor(Math.random() * colorNames.length)];
    }

    static getRandomColorShade(shadeFactor = 0.2) {
        const randomColor = Colorizer.getRandomColor();
        const originalRGB = Colorizer.getRGB(randomColor);
        const randomShade = Colorizer.getRandomShade(originalRGB, shadeFactor);
        return { colorName: randomColor, originalRGB, randomShade };
    }
}

export default Colorizer;