/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-bg-fade':
          'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8) 100%)',
        'custom-bg-both-fade':
          'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,1) 100%)',
      },
      colors: {
        brand1: '#f51a3b',
        brand2: '#1EBC99',
        brand3: '#F9CC0D',
        brand4: '#1884F7',
        black1: '#0A070B',
        black2: '#363536',
        black3: '#4F4E50',
        black4: '#E8ECEF',
      },
    },
  },
  plugins: [],
};
