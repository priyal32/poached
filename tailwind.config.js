/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        "dark-1": "#202123",
        "dark-2": "#171819",
        "dark-neutral": "#2a2b2d",
      },
      fontFamily: {
        primary: ["TT Norms Pro", "ui-sans-serif", "system-ui"],
        headline: ["Gilroy", "ui-sans-serif", "system-ui"],
      },
      animation: {
        text: "text 5s ease infinite",
        "slide-down-normal": "slideDownNormal 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        "slide-up-normal": "slideUpNormal 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          slideDownNormal: {
            "0%": { height: 0, opacity: 0 },
            "100%": {
              height: "inherit",
              opacity: 1,
            },
          },
          slideUpNormal: {
            "0%": { height: "inherit", opacity: 1 },
            "100%": { height: 0, opacity: 0 },
          },
        },
      },
    },
  },
  plugins: [],
};
