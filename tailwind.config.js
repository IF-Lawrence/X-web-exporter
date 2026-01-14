import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          'color-scheme': 'light',
          primary: '#1d9bf0', // Twitter Blue
          'primary-content': '#ffffff',
          secondary: '#1d9bf0',
          accent: '#1d9bf0',
          neutral: '#0f1419', // Twitter Light Text
          'base-100': '#ffffff', // Twitter Light BG
          'base-200': '#f7f9f9', // Twitter Light Alt BG
          'base-300': '#eff3f4',
          'base-content': '#0f1419',
          info: '#1d9bf0',
          success: '#00ba7c',
          warning: '#ffd400',
          error: '#f91880',
          '--rounded-btn': '1rem',
        },
      },
      {
        dim: {
          'color-scheme': 'dark',
          primary: '#1d9bf0',
          'primary-content': '#ffffff',
          secondary: '#1d9bf0',
          accent: '#1d9bf0',
          neutral: '#ffffff',
          'base-100': '#15202b', // Twitter Dim BG
          'base-200': '#1e2732',
          'base-300': '#273340',
          'base-content': '#f7f9f9',
          info: '#1d9bf0',
          success: '#00ba7c',
          warning: '#ffd400',
          error: '#f91880',
          '--rounded-btn': '1rem',
        },
      },
      {
        dark: {
          'color-scheme': 'dark',
          primary: '#1d9bf0',
          'primary-content': '#ffffff',
          secondary: '#1d9bf0',
          accent: '#1d9bf0',
          neutral: '#ffffff',
          'base-100': '#000000', // Twitter Lights Out BG
          'base-200': '#16181c',
          'base-300': '#202327',
          'base-content': '#e7e9ea',
          info: '#1d9bf0',
          success: '#00ba7c',
          warning: '#ffd400',
          error: '#f91880',
          '--rounded-btn': '1rem',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
