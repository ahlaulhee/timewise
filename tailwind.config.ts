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
        main: "#0F111A",
        foreground: "#8F93A2",
        "custom-green": "#c3e88d",
        "custom-yellow": "#ffcb6b",
        "custom-blue": "#82aaff",
        "custom-red": "#f07178",
        "custom-purple": "#c792ea",
        "custom-orange": "#f78c6c",
        "custom-cyan": "#89ddff",
        "custom-gray": "#717CB4",
        "custom-white": "#eeffff",
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
