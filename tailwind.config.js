/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    // themes: [
    //   {
    //     elan: {
    //       primary: "#93ea70",
    //       secondary: "#a4fce4",
    //       accent: "#97bc10",
    //       neutral: "#1B1B28",
    //       "base-100": "#43484C",
    //       info: "#97B2F2",
    //       success: "#19864F",
    //       warning: "#F0B856",
    //       error: "#E1624C",
    //     },
    //     cyber: {
    //       primary: "#FF7598",
    //       secondary: "#75D1F0",
    //       accent: "#C07EEC",
    //       neutral: "#423F00",
    //       "base-100": "#FFEE00",
    //       info: "#3ABFF8",
    //       success: "#36D399",
    //       warning: "#FBBD23",
    //       error: "#F87272",
    //     },
    //   },
    // ],
  },
};
