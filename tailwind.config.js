module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['glacial indifference', 'sans-serif'],
      'Rokkitt': ['Rokkitt'],
      'Poppins': ['Poppins'],
    },
    textColor: {
      primary: '#6C63FF',
      secondary: "#C6930A",
      white: '#fff',
      reference: '#CCCCCC',
      wellbeing: '#F7CAC9',
      red: 'red'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0px 0px 7px rgba(0, 0, 0, 0.4)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    backgroundColor: {
      primary: '#6C63FF',
      secondary: '#C6930A',
      tertiary: "#4B4A80",
      slogan: '#F0EFFE',
      mood: "#FFC289",
    },
    borderColor: theme => ({
      ...theme('textColor')
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}