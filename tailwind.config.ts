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
        paper: "var(--paper)",
        "text-primary": "var(--text-primary)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-deep": "var(--accent-deep)",
        chrome: "var(--chrome)",
        muted: "var(--text-muted)",
        line: "var(--line)",
        focus: "var(--focus)",
      },
      fontFamily: {
        display: ["var(--font-nunito)", "Nunito", "sans-serif"],
        opendyslexic: ["var(--font-opendyslexic)", "Verdana", "sans-serif"],
        atkinson: ["var(--font-atkinson)", "Verdana", "sans-serif"],
        classic: ["var(--font-classic)", "Georgia", "Times New Roman", "serif"],
        chrome: ["var(--font-lexend)", "Lexend", "sans-serif"],
      },
      letterSpacing: {
        reading: "0.02em",
      },
      lineHeight: {
        reading: "1.7",
      },
      maxWidth: {
        reader: "34rem",
        measure: "65ch",
      },
      minHeight: {
        tap: "48px",
      },
      minWidth: {
        tap: "48px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
