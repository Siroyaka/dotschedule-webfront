module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/component/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [],
}
