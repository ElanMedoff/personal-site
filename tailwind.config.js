/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
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
        light: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/theming/themes")["cupcake"],
          neutral: "#2B3440",
          // from light
          "neutral-content": "#D7DDE4",
          "base-100": "#FFFFFF",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/theming/themes")["dark"],
          // from cupcake
          primary: "#65c3c8",
          accent: "#eeaf3a",
          // custom
          secondary: "#eb89ad",
          neutral: "#4a5869",
          info: "#0392ce",
          accent: "#e29913",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
