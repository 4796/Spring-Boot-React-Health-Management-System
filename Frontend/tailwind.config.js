/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#060b11",
        light: "#f6f9fd",
        primary: "#327bdb",
        secondary: "#86b5f3",
        accent: "#4b96f9",

        good: "#1ea976",
        danger: "#d93e26",
      },
    },
  },
  plugins: [],
};
