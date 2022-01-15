module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  variants: {

    extend: {
      backgroundOpacity: ['active', 'hover'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active']
    }

  },
  plugins: [],
}
