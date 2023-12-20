/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: ["12px", "1.25rem"],
      base: ["15px", "1.25rem"],
      lg: ["20px", "1.25rem"],
      xl: ["30px", "1.15rem"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#000000",
          secondary: "#D9D9D9",
          accent: "#AAA5A5",
          neutral: "#EFF2C0",
        },
      },
    ],
  },
};
