/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B0B10',
        'bg-surface': '#15151B',
        'bg-elevated': '#1E1E26',
        'border-subtle': '#2C2C34',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B4B2A9',
        'text-muted': '#888780',
        accent: {
          DEFAULT: '#EF9F27',
          soft: '#FAC775',
          deep: '#854F0B',
        },
        whatsapp: {
          DEFAULT: '#0F6E56',
          hover: '#0B5C48',
          light: '#9FE1CB',
        },
        badge: {
          bg: '#085041',
          dot: '#5DCAA5',
        },
        danger: '#E24B4A',
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'full': '9999px',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        'amber-glow': '0 0 50px -10px rgba(239, 159, 39, 0.35)',
        'amber-glow-lg': '0 0 80px -5px rgba(239, 159, 39, 0.45)',
        'card-subtle': '0 8px 30px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.85' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
