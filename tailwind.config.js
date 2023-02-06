/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const radixUiColors = require("@radix-ui/colors");
const brandColors = require("./config/default-colors");

const fixedColors = ["main", "mainA", "brand"];

function radixColorKeys() {
  let keys = Object.keys(radixUiColors);

  function filterItems(arr, query) {
    return arr.filter((el) => el.toLowerCase().indexOf(query.toLowerCase()) == -1);
  }

  keys = filterItems(keys, "Dark");

  return keys;
}

function generateColorClasses() {
  const brandColors = ["brand", "main", "mainA"];
  const colors = [...radixColorKeys(), ...brandColors];

  let mappedColors = {};

  colors.map((x) => {
    mappedColors[x] = {};
    if (
      fixedColors.some(function (v) {
        return x.indexOf(v) >= 0;
      })
    ) {
      mappedColors[`${x}-fixed`] = {};
    }
  });

  colors.map((x) => {
    for (let index = 0; index < 12; index++) {
      const step = index + 1;
      mappedColors[x][step * 100] = `var(--colors-${x}${step})`;

      if (
        fixedColors.some(function (v) {
          return x.indexOf(v) >= 0;
        })
      ) {
        mappedColors[`${x}-fixed`][step * 100] = `var(--colors-fixed-${x}${step})`;
      }
    }
  });

  return mappedColors;
}

const colorClasses = generateColorClasses();

function generateCssVariables() {
  let rootColors = {};
  let darkColors = {};

  const radixArray = Object.values(radixUiColors);
  const brandArray = Object.values(brandColors);

  function generateColors(colors, index, colorSet) {
    const key = Object.keys(colorSet)[index];

    if (key.includes("Dark")) {
      darkColors = { ...darkColors, ...colors };
    } else {
      rootColors = { ...rootColors, ...colors };

      // generate an optional 'fixed' scale of colors
      if (
        fixedColors.some(function (v) {
          return key.indexOf(v) >= 0;
        })
      ) {
        rootColors.fixed = { ...rootColors?.fixed, ...colors };
      }
    }
  }

  radixArray.map((x, i) => {
    generateColors(x, i, radixUiColors);
  });

  brandArray.map((x, i) => {
    generateColors(x, i, brandColors);
  });

  return {
    root: { ...rootColors },
    dark: { ...darkColors },
  };
}

const variables = generateCssVariables();

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    variables: {
      DEFAULT: {
        colors: { ...variables.dark },
      },
    },
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
        ...colorClasses,
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
  plugins: [require("@mertasan/tailwindcss-variables")],
};
