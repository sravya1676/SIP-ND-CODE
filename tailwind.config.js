/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2EA',
        beige: '#E8D8C6',
        coffee: '#3B2418',
        espresso: '#21150F',
        sage: '#708064',
        terracotta: '#C9795E',
        peach: '#F1C7B4',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(33, 21, 15, 0.12)',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
