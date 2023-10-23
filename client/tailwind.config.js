/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff7ac6",
          "secondary": "#bf95f9",
          "accent": "#ffb86b",
          "neutral": "#414558",
          "base-100": "#272935",
          "info": "#8be8fd",
          "success": "#52fa7c",
          "warning": "#f1fa89",
          "error": "#ff5757",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

