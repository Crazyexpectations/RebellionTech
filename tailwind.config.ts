import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: {
          DEFAULT: '#050508',
          50: '#08080e',
          100: '#0b0b13',
          200: '#0e0e16',
          300: '#14141f',
        },
        ember: {
          DEFAULT: '#ef3b23',
          deep: '#c41e0f',
          light: '#ff7a5c',
        },
        signal: {
          DEFAULT: '#2ad4f0',
          deep: '#0e9bb8',
        },
        brass: {
          DEFAULT: '#f0b64a',
          deep: '#c98a2e',
        },
      },
      maxWidth: {
        rb: '1220px',
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
