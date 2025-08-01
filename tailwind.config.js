// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#0D9488',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(to right, #10B981, #0D9488)',
      },
    },
  },
  plugins: [],
}