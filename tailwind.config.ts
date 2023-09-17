import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#070707",
        foreground: "#DCDCDC", // #171a26 // #8F93A2
        // RED
        "dark-red": "#6B0000",
        maroon: "#800000",
        crimson: "#DC143C",
        // BLUE
        "dark-blue": "#00008B",
        "navy-blue": "#000080",
        "royal-blue": "#4169E1",
        // GREEN
        "dark-green": "#006400",
        "forest-green": "#228B22",
        "olive-green": "#808000",
        // YELLOW
        "dark-goldenrod": "#B8860B",
        gold: "#FFD700",
        yellow: "#FFFF00",
        // PURPLE
        "dark-purple": "#800080",
        indigo: "#4B0082",
        violet: "#8A2BE2",
        // ORANGE
        "dark-orange": "#FF8C00",
        orange: "#FFA500",
        coral: "#FF7F50",
        // CYAN
        "dark-cyan": "#008B8B",
        teal: "#008080",
        aqua: "#00FFFF",
        // GRAY
        "dark-gray": "#A9A9A9",
        "dim-gray": "#696969",
        "slate-gray": "#708090",
        // WHITE
        snow: "#FFFAFA",
        "white-smoke": "#F5F5F5",
        gainsboro: "#DCDCDC",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
        ubuntu: ["var(--font-ubuntu)"],
        worksans: ["var(--font-work-sans)"],
        quicksand: ["var(--font-quicksand)"],
      },
    },
  },
  plugins: [],
};
export default config;
