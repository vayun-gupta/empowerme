import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8e7dbe",
        "on-primary": "#ffffff",
        "primary-container": "#e9e4f4",
        "on-primary-container": "#211b33",
        "primary-fixed": "#e8ddff",
        "primary-fixed-dim": "#cfbdff",
        "on-primary-fixed": "#200e4b",
        "on-primary-fixed-variant": "#4c3d79",
        secondary: "#7b5455",
        "on-secondary": "#ffffff",
        "secondary-container": "#fecbcb",
        "on-secondary-container": "#7a5354",
        tertiary: "#69566b",
        "tertiary-container": "#f5daf4",
        "on-tertiary-container": "#251628",
        surface: "#fbf9f8",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#49454f",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#efeded",
        "surface-container-high": "#eae8e7",
        "surface-container-highest": "#e4e2e2",
        background: "#fbf9f8",
        "on-background": "#1b1c1c",
        outline: "#7a7580",
        "outline-variant": "#cac4d0",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
