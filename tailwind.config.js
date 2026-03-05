export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nb-black': '#000000',
        'nb-white': '#FFFFFF',
        'nb-red': '#DC2626',
        'nb-gold': '#B8860B',
      },
      borderWidth: {
        'nb': '4px',
      },
    },
  },
  plugins: [],
}
