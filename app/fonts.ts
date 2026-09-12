import localFont from "next/font/local";

export const openDyslexic = localFont({
  src: [
    { path: "./fonts/OpenDyslexic-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenDyslexic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-opendyslexic",
  display: "swap",
  fallback: ["Verdana", "sans-serif"],
});

export const atkinson = localFont({
  src: [
    {
      path: "./fonts/AtkinsonHyperlegible-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AtkinsonHyperlegible-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-atkinson",
  display: "swap",
  fallback: ["Verdana", "sans-serif"],
});

export const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-classic",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
