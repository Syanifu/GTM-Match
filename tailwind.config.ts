import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0A0A0B' },
        surface: { DEFAULT: '#101013' },
        border: { DEFAULT: 'rgba(255,255,255,0.08)' },
        fg: { DEFAULT: '#EDEDEF', muted: '#8A8A93' },
        accent: {
          DEFAULT: '#00E0FF',
          hover: '#33E8FF',
          dim: 'rgba(0,224,255,0.15)',
        },
        success: '#5CFFB1',
        warn: '#FFB45C',
        danger: '#FF5C7A',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'Geist Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: { sm: '6px', DEFAULT: '10px', lg: '14px', xl: '20px' },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
      backdropBlur: { xs: '4px' },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,224,255,0.4), 0 0 24px rgba(0,224,255,0.15)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
