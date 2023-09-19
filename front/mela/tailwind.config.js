/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      IMFrench:['IM Fell French Canon', "serif"],
      LeagueSpartan:['League Spartan', "sans-serif"],
      Montserrat: ['Montserrat', "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
      Ubuntu: ['Ubuntu', "sans-serif"],
    },
    backgroundColor: {
      buttonbg: "#8a4ff5",
      lightPurple: "#b288fd",
      transparent: "#00000000",
      body: "#f1eded",
      white: "#ffffff",
    },
    borderColor: {
      purple: "#8a4ff5",
    }
  },
  plugins: [],
}
