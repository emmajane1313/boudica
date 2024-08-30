import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rojo: "#D63B39",
        azul: "#B1CBC8",
        rosa: "#CB708D",
        offBlack: "#111313",
      },
      fontFamily: {
        arana: "Eclipse",
        conso: "Conso Regular",
        type: "Typewriter",
      },
    },
  },
  plugins: [],
};
export default config;
