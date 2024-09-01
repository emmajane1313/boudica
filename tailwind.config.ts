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
        crema: "#E2D5C1",
      },
      fontFamily: {
        conso: "Conso Regular",
        type: "Typewriter",
        cor: "Corona",
        mat: "MatatakiMincho",
        rub: "Rubik",
        dav: "BDavat",
        ruw: "Ruwudu",
        ad: "AdonisC",
        gen: "GenEiLateMinP_v2",
        not: "Noto",
        zar: "Zar",
      },
      fontSize: {
        xxs: "0.5rem"
      }
    },
  },
  plugins: [],
};
export default config;
