module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  content: ['./components/**/*.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      animation: {
        "scale-out-ver-top": "scale-out-ver-top 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "scale-in-ver-top": "scale-in-ver-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "fade-in": "fade-in  0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   none"
      },
      keyframes: {
        "fade-in": {
          "0%": {
            transform: "translateY(-50px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "scale-out-ver-top": {
          "0%": {
            transform: "scaleY(1)",
            "transform-origin": "100% 0%",
            opacity: "1"
          },
          to: {
            transform: "scaleY(0)",
            "transform-origin": "100% 0%",
            opacity: "1",
            "max-height": "0px"
          }
        },
        "scale-in-ver-top": {
          "0%": {
            transform: "scaleY(0)",
            "transform-origin": "100% 0%",
            opacity: "1"
          },
          to: {
            transform: "scaleY(1)",
            "transform-origin": "100% 0%",
            opacity: "1"
          }
        }
      }
    },
  },
  variants: {

    extend: {
      backgroundOpacity: ['active', 'hover'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active']
    }

  },
  plugins: [],
}
