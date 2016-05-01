import { expect } from 'chai';
import geometryUtils from '../../public/js/utils/geometry_utils';

describe('geometryUtils', function() {
  describe('#getPositionAtAngleAndDistance', function() {
    let x;
    let y;
    let angle;
    let distance;

    beforeEach(function() {
      x = 0;
      y = 0;
      angle = 0;
      distance = 10;
    });

    describe('given 0 distance', function() {
      beforeEach(function() {
        distance = 0;
      });

      it('returns the same point', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x, 0.1);
        expect(result.y).to.closeTo(y, 0.1);
      });
    });

    describe('given 0 angle', function() {
      beforeEach(function() {
        angle = 0;
      });

      it('returns the point directly to the right', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x + distance, 0.1);
        expect(result.y).to.closeTo(y, 0.1);
      });
    });

    describe('given pi angle', function() {
      beforeEach(function() {
        angle = Math.PI;
      });

      it('returns the point directly to the left', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x - distance, 0.1);
        expect(result.y).to.closeTo(y, 0.1);
      });
    });

    describe('given 3pi/2 angle', function() {
      beforeEach(function() {
        angle = 3 * Math.PI / 2;
      });

      it('returns the point directly below', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x, 0.1);
        expect(result.y).to.closeTo(y - distance, 0.1);
      });
    });

    describe('given pi/2 angle', function() {
      beforeEach(function() {
        angle = Math.PI / 2;
      });

      it('returns the point directly above', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x, 0.1);
        expect(result.y).to.closeTo(y + distance, 0.1);
      });
    });

    describe('given pi/4 angle', function() {
      beforeEach(function() {
        angle = Math.PI / 4;
      });

      it('returns the point 45deg up and to the right', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(distance / Math.sqrt(2), 0.1);
        expect(result.y).to.closeTo(distance / Math.sqrt(2), 0.1);
      });
    });

    describe('given 2pi angle', function() {
      beforeEach(function() {
        angle = 2 * Math.PI;
      });

      it('returns the point directly to the right (same as angle of 0)', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(x + distance, 0.1);
        expect(result.y).to.closeTo(y, 0.1);
      });
    });

    describe('given pi/3 angle', function() {
      beforeEach(function() {
        angle = Math.PI / 3;
      });

      it('returns the point at a 60deg angle up and to the right', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(distance / 2, 0.1);
        expect(result.y).to.closeTo(distance * Math.sqrt(3) / 2, 0.1);
      });
    });

    describe('given 11pi/12 angle', function() {
      beforeEach(function() {
        angle = 11 * Math.PI / 6;
      });

      it('returns the point at a 330 degree angle (down and to right)', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(distance * Math.sqrt(3) / 2, 0.1);
        expect(result.y).to.closeTo(-1 * distance / 2, 0.1);
      });
    });

    describe('given a 183deg angle', function() {
      beforeEach(function() {
        angle = 3.19395;
      });

      it('returns the correct answer in the second quadrant', function() {
        const result = geometryUtils.getPositionAtAngleAndDistance(x, y, angle, distance);

        expect(result.x).to.closeTo(distance * -0.9986297, 0.1);
        expect(result.y).to.closeTo(distance * -0.0523334, 0.1);
      });
    });
  });
});
