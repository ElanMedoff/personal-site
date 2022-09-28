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
        cyber: {
          primary: "#ff7598",
          "primary-focus": "#ff295e",
          "primary-content": "#4d0013",
          secondary: "#75d1f0",
          "secondary-focus": "#35bce9",
          "secondary-content": "#003647",
          accent: "#c07eec",
          "accent-focus": "#a240e2",
          "accent-content": "#2b0047",
          neutral: "#423f00",
          "neutral-focus": "#333000",
          "neutral-content": "#ffee00",
          "base-100": "#ffee00",
          "base-200": "#e6d600",
          "base-300": "#d1c300",
          info: "#3abff8",
          "info-content": "#002b3d",
          success: "#36d399",
          "success-content": "#36d399",
          warning: "#fbbd23",
          "warning-content": "#382800",
          error: "#f87272",
          "error-content": "#470000",
        },
      },
      "dracula",
    ],
  },
  plugins: [require("daisyui")],
};
