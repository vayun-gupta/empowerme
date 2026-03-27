import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0ea5e9",
        "primary-landing": "#6366f1",
        "background-light": "#f6f6f8",
        "background-dark": "#0a0a1a",
        "chat-bg-dark": "#0a0c12",
        "card-bg": "rgba(30, 30, 50, 0.6)",
        "adversary": "#f8fafc",
        "adversary-dark": "#020617",
        "neon-blue": "#00f2ff",
      },
      fontFamily: {
        "display": ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
