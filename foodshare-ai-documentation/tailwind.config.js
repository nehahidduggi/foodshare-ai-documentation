export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { navy: { 950: '#060d1f', 900: '#0a1530', 800: '#0f1f45', 700: '#1a2f61' }, leaf: '#22c58b', amber: '#ff9a3c', sky: '#4fd8e8', lav: '#a99bff', cream: '#f6f3ea' },
    fontFamily: { sans: ['"Segoe UI"', 'system-ui', 'Roboto', 'sans-serif'], display: ['"Trebuchet MS"', '"Segoe UI"', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
}
