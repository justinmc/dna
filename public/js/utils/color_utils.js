const colorUtils = {
  /**
   * Given a hex color string, return the hex color string either black or
   * white, whichever contrasts more
   * @param {String} hexString
   * @returns {String}
   */
  getContrastingColor(hexString) {
    const { r, g, b } = colorUtils.getHexForString(hexString);
    const luminance = colorUtils.getLuminance(r, g, b);

    return luminance < 128 ? '#ffffff' : '#000000';
  },

  /**
   * Given a hex color string like '#ffffff', return its numerical values
   * @param {String} hexString
   * @returns {Object} r, g, b
   */
  getHexForString(hexString) {
    let hexStringWithoutHash = hexString;

    if (hexString.indexOf('#') === 0) {
      hexStringWithoutHash = hexString.substr(1, hexString.length - 1);
    }

    return {
      r: parseInt(hexStringWithoutHash.substr(0, 2), 16),
      g: parseInt(hexStringWithoutHash.substr(2, 2), 16),
      b: parseInt(hexStringWithoutHash.substr(4, 2), 16),
    };
  },

  /**
   * Returns the luminance given r, g, b colors
   * @param {Number} r 0-255
   * @param {Number} g 0-255
   * @param {Number} b 0-255
   */
  getLuminance(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },
};

export default colorUtils;
