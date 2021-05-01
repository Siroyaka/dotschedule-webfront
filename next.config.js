module.exports = (phase, { defaultConfig }) => {
  /* config options here */
  return {
    ...defaultConfig,
    future: {
      webpack5: true
    }
  }
}