module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      //  'serif': ['ui-serif', 'serif'],
      //  'mono': ['ui-monospace', 'monospace'],
      //  'display': ['Oswald'],
      //  'body': ['"Open Sans"'],
    },
    extend: {
      colors: {
        primary: '#4F46E5',
        utu: {
          primary: '#FFDD33',
          400: '#FFF6C7',
          500: '#FFFBEB',
          900: '#FFDD33',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
