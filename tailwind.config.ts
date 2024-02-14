import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
    },
  },
  plugins: [],
};
export default config;
