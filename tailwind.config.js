/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  daisyui: {
    themes: [
      {
        retro: {
          primary: "#EF9995",
          "primary-focus": "#e55952",
          "primary-content": "#282425",
          secondary: "#A4CBB4",
          "secondary-focus": "#77b18f",
          "secondary-content": "#282425",
          accent: "#EBDC99",
          "accent-focus": "#dec659",
          "accent-content": "#282425",
          neutral: "#7D7259",
          "neutral-focus": "#655d48",
          "neutral-content": "#e4d8b4",
          "base-100": "#E4D8B4",
          "base-200": "#d2c59d",
          "base-300": "#c6b386",
          info: "#2463EB",
          "info-content": "#d1e0ff",
          success: "#16A249",
          "base-content": "#282425",
          "success-content": "#bdffd5",
          warning: "#DB7706",
          error: "#DC2828",
          "warning-content": "#2e1800",
          "error-content": "#ffcccc",
        },
      },
      "dracula",
    ],
  },
  plugins: [require("daisyui")],
};
