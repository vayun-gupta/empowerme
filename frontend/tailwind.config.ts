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
        "primary": "#2563EB", // blue-600
        "primary-hover": "#1D4ED8", // blue-700
      },
      fontFamily: {
        "display": ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.375rem", // slightly more rounded for SaaS look
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
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
