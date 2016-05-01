const geometryUtils = {
  getPoint(x, y, angle, turn, distance) {
    const newAngle = angle + turn;
    return geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);
  },

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

  /**
   * Returns the interior angle of a polygon with <vertices> number of vertices
   * @param {Number} vertices
   * @return {Number} angle in radians
   */
  getInteriorAngle(vertices) {
    if (vertices < 2) {
      throw new Error('vertices must be 2 or more');
    }

    // sum of interior angles = 180deg(n - 2)
    return Math.PI * (vertices - 2) / vertices;
  },
};

export default geometryUtils;
