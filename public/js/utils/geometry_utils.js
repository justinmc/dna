const geometryUtils = {
  /**
   * Find the position the given distance away from the given point at the given angle
   * @param {Number} x
   * @param {Number} y
   * @param {Number} angle, in radians
   * @param {Number} distance
   * @returns {Object} with x and y attributes
   */
  getPositionAtAngleAndDistance(x, y, angle, distance) {
    // cos(angle) = dx / distance
    const dx = distance * Math.cos(angle);

    // sin(angle) = dy / distance
    const dy = distance * Math.sin(angle);

    return {
      x: x + dx,
      y: y + dy,
    };
  },
};

export default geometryUtils;
