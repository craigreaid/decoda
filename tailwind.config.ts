import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        reader: ["var(--font-reader)", "Georgia", "serif"],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b6d7ff",
          300: "#84bbff",
          400: "#4a94ff",
          500: "#1f6dff",
          600: "#0b4fdb",
          700: "#0a3fb0",
          800: "#0e378c",
          900: "#12326f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
