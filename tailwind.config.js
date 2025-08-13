/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1280px",
          xl: "1440px",
        },
      },
      colors: {
        orange: "#FF9737",
        pink: "#F42C5C",
        blue: "#1D66F3",
        purple: "#7140FF",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      onecol: "1000px",
      md: "1280px",
      lg: "1440px",
      xl: "1920px",
    },
  },
  plugins: [],
};
