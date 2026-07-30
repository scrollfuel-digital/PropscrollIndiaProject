import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F2540",
        teal: {
          DEFAULT: "#008C99",
          600: "#008C99",
          700: "#006e78",
        },
        mustard: "#FCC02E",
        brand: {
          red: "#D63528",
        },
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
        jakarta: ["Noto Sans JP", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
