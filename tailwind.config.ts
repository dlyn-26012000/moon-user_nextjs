import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b00', // Orange
        secondary: '#001f3f', // Navy/Dark Blue
        white: '#ffffff',
        'light-gray': '#f5f5f5',
        'dark-gray': '#333333', // For text
      },
      borderRadius: {
        '4xl': '2rem', // 32px
        '3xl': '1.5rem', // 24px
        '2xl': '1rem', // 16px
        xl: '0.75rem', // 12px
        lg: '0.5rem', // 8px
        md: '0.375rem', // 6px
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
