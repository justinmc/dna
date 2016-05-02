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

  /**
   * Returns true if the point is inside the circle
   * Currently took the lazy way out and did a square
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} pointX
   * @param {Number} pointY
   */
  isIinsideCircle(x, y, radius, pointX, pointY) {
    const xInside = pointX > x - radius && pointX < x + radius;
    const yInside = pointY > y - radius && pointY < y + radius;

    return xInside && yInside;
  },
};

export default geometryUtils;
