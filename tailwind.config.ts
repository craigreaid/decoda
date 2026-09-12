import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "text-primary": "var(--text-primary)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        chrome: "var(--chrome)",
        muted: "var(--text-muted)",
        line: "var(--line)",
      },
      fontFamily: {
        opendyslexic: ["var(--font-opendyslexic)", "Verdana", "sans-serif"],
        atkinson: ["var(--font-atkinson)", "Verdana", "sans-serif"],
        classic: ["var(--font-classic)", "Georgia", "Times New Roman", "serif"],
        chrome: ["var(--font-chrome)", "Verdana", "sans-serif"],
      },
      maxWidth: {
        reader: "34rem",
        measure: "52ch",
      },
      minHeight: {
        tap: "48px",
      },
      minWidth: {
        tap: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
