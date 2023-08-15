/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      bg_main: "url('/images/bg.jpg')",
      bg_pet: "url('/images/pet_bg.png')",
    },
    extend: {
      fontSize: {
        "display-large": "57px",
        "display-medium": "45px",
        "display-small": "36px",
        "headline-large": "32px",
        "headline-medium": "28px",
        "headline-small": "24px",
        "title-large": "22px",
        "title-medium": "16px",
        "title-small": "14px",
        "label-large": "14px",
        "label-medium": "12px",
        "label-small": "11px",
        "body-large": "16px",
        "body-medium": "14px",
        "body-small": "12px",
      },
      colors: {
        primary: {
          100: "rgba(255,255,255,255)",
          99: "rgba(255,255,255,255)",
          98: "rgba(226,255,255,255)",
          95: "rgba(175,255,255,255)",
          90: "rgba(79,249,251,255)",
          80: "rgba(21,220,222,255)",
          70: "rgba(0,190,192,255)",
          60: "rgba(0,161,163,255)",
          50: "rgba(0,133,134,255)",
          40: "rgba(0,105,107,255)",
          35: "rgba(0,92,93,255)",
          30: "rgba(0,79,80,255)",
          25: "rgba(0,67,68,255)",
          20: "rgba(0,55,55,255)",
          10: "rgba(0,32,32,255)",
          0: "rgba(0,0,0,255)",
        },
        secondary: {
          100: "rgba(255,255,255,255)",
          99: "rgba(241,255,254,255)",
          98: "rgba(227,255,254,255)",
          95: "rgba(218,246,246,255)",
          90: "rgba(204,232,231,255)",
          80: "rgba(176,204,203,255)",
          70: "rgba(149,176,176,255)",
          60: "rgba(149,176,176,255)",
          50: "rgba(98,124,124,255)",
          40: "rgba(74,99,99,255)",
          35: "rgba(62,87,87,255)",
          30: "rgba(50,75,75,255)",
          25: "rgba(39,64,64,255)",
          20: "rgba(27,52,53,255)",
          10: "rgba(4,31,32,255)",
          0: "rgba(0,0,0,255)",
        },
        tertiary: {
          100: "rgba(255,255,255,255)",
          99: "rgba(253,252,255,255)",
          98: "rgba(248,249,255,255)",
          95: "rgba(235,241,255,255)",
          90: "rgba(211,227,255,255)",
          80: "rgba(179,200,233,255)",
          70: "rgba(152,172,204,255)",
          60: "rgba(126,146,177,255)",
          50: "rgba(100,120,150,255)",
          40: "rgba(76,95,124,255)",
          35: "rgba(64,83,111,255)",
          30: "rgba(52,72,99,255)",
          25: "rgba(40,60,87,255)",
          20: "rgba(29,49,75,255)",
          10: "rgba(5,28,53,255)",
          0: "rgba(0,0,0,255)",
        },
        error: {
          100: "rgba(255,255,255,255)",
          99: "rgba(255,251,255,255)",
          98: "rgba(255,248,247,255)",
          95: "rgba(255,237,234,255)",
          90: "rgba(255,218,214,255)",
          80: "rgba(255,180,171,255)",
          70: "rgba(255,137,125,255)",
          60: "rgba(255,84,73,255)",
          50: "rgba(222,55,48,255)",
          40: "rgba(186,26,26,255)",
          35: "rgba(168,7,16,255)",
          30: "rgba(147,0,10,255)",
          25: "rgba(126,0,7,255)",
          20: "rgba(105,0,5,255)",
          10: "rgba(65,0,2,255)",
          0: "rgba(0,0,0,255)",
        },
        light: {
          primary: {
            base: "rgba(0,105,107,255)",
            on: "rgba(255,255,255,255)",
            container: "rgba(79,249,251,255)",
            container_on: "rgba(0,32,32,255)",
          },
          secondary: {
            base: "rgba(74,99,99,255)",
            on: "rgba(255,255,255,255)",
            container: "rgba(204,232,231,255)",
            container_on: "rgba(4,31,32,255)",
          },
          teritary: {
            base: "rgba(76,95,124,255)",
            on: "rgba(255,255,255,255)",
            container: "rgba(211,227,255,255)",
            container_on: "rgba(5,28,53,255)",
          },
          error: {
            base: "rgba(186,26,26,255)",
            on: "rgba(255,255,255,255)",
            container: "rgba(255,218,214,255)",
            container_on: "rgba(65,0,2,255)",
          },
          background: {
            base: "rgba(250,253,252,255)",
            on: "rgba(25,28,28,255)",
            surface: "rgba(250,253,252,255)",
            surface_variant: "rgba(218,229,228,255)",
            surface_on: "rgba(25,28,28,255)",
            surface_on_variant: "rgba(63,73,72,255)",
          },
          outline: {
            base: "rgba(111,121,121,255)",
          },
        },
        dark: {
          primary: {
            base: "rgba(21,220,222,255)",
            on: "rgba(0,55,55,255)",
            container: "rgba(0,79,80,255)",
            container_on: "rgba(79,249,251,255)",
          },
          secondary: {
            base: "rgba(176,204,203,255)",
            on: "rgba(27,52,53,255)",
            container: "rgba(50,75,75,255)",
            container_on: "rgba(204,232,231,255)",
          },
          teritary: {
            base: "rgba(179,200,233,255)",
            on: "rgba(29,49,75,255)",
            container: "rgba(52,72,99,255)",
            container_on: "rgba(211,227,255,255)",
          },
          error: {
            base: "rgba(255,180,171,255)",
            on: "rgba(105,0,5,255)",
            container: "rgba(147,0,10,255)",
            container_on: "rgba(255,218,214,255)",
          },
          background: {
            base: "rgba(25,28,28,255)",
            on: "rgba(224,227,226,255)",
            surface: "rgba(25,28,28,255)",
            surface_variant: "rgba(63,73,72,255)",
            surface_on: "rgba(224,227,226,255)",
            surface_on_variant: "rgba(190,200,200,255)",
          },
          outline: {
            base: "rgba(137,147,146,255)",
          },
        },
      },
    },
  },
  plugins: [],
};
