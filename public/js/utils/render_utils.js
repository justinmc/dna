import React from 'react';
import CanvasBase from '../components/canvas_base.jsx';
import CanvasConnector from '../components/canvas_connector.jsx';
import baseStructures from '../constants/base_structures';
import geometryUtils from '../utils/geometry_utils';

const SPACING = 150;

const renderUtils = {
  /**
   * Render the indicated base and everything coming after it,
   * starting at the given point and direction
   * @param {Immutable.List} basesList
   */
  renderBasesList(basesList, startIndex, x, y, startAngle) {
    let bases = [];
    let connectors = [];
    let bbox = {
      x,
      y,
      width: 0,
      height: 0,
    };
    const recursions = [];
    let angle = startAngle;

    const renderableBases = renderUtils.getRenderableBases(basesList, startIndex);

    renderableBases.forEach((base, index) => {
      const open = base.structure === baseStructures.PAIR_OPEN;
      const close = base.structure === baseStructures.PAIR_CLOSE;

      let baseX = x + 50;
      let baseY = y + 100;
      const turn = Math.PI - geometryUtils.getInteriorAngle(renderableBases.length);
      let previousPositions;

      if (index > 0) {
        previousPositions = bases[index - 1].props;

        ({ x: baseX, y: baseY } = geometryUtils.getPositionAtAngleAndDistance(
          previousPositions.x,
          previousPositions.y,
          angle,
          SPACING
        ));

        angle += turn;
      } else {
        // Set the initial angle to turn from
        angle = turn - Math.PI / 2 + startAngle;
      }

      if (open) {
        // We'll need to recurse on this base later
        recursions.push({
          index: base.index + 1,
          x: baseX,
          y: baseY,
          angle: angle - Math.PI / 2,
        });
      } else if (close) {
        /*
         * TODO render pair connector
        const openPositions = openStack.pop();
        x = openPositions.x;
        y = openPositions.y + 150;

        connectors.push(
          <CanvasConnector
            key={`connector-close-${index}`}
            startX={openPositions.x}
            startY={openPositions.y}
            endX={x}
            endY={y}
          />
        );
        */
      }

      bases.push(
        <CanvasBase
          key={`base-${base.index}`}
          x={baseX}
          y={baseY}
          type={base.type}
        />
      );
      basesList = basesList.set(base.index, base.set('rendered', true));
      bbox = renderUtils.updateBboxWithPoint(bbox, x, y);

      if (previousPositions) {
        connectors.push(
          <CanvasConnector
            key={`connector-${base.index}`}
            startX={previousPositions.x}
            startY={previousPositions.y}
            endX={baseX}
            endY={baseY}
          />
        );
      }
    });

    // Recurse on exit points we found
    recursions.forEach((recurseData) => {
      const recurseResults = renderUtils.renderBasesList(
        basesList,
        recurseData.index,
        recurseData.x,
        recurseData.y,
        recurseData.angle
      );
      bases = bases.concat(recurseResults.bases);
      connectors = connectors.concat(recurseResults.connectors);
      bbox = renderUtils.updateBboxWithBbox(bbox, recurseResults.bbox);
    });

    return { bases, connectors, bbox };
  },

  /**
   * Find smallest group of bases we know enough to render
   * @param {Immutable.List} basesList
   * @param {Number} index
   * @returns {Array}
   */
  getRenderableBases(basesList, index = 0) {
    const renderableBases = [];
    let base = basesList.get(index);

    while (base && !base.rendered) {
      renderableBases.push(base);

      if (base.pair) {
        renderableBases.push(base.pair);
        base = basesList.get(base.pair.index + 1);
      } else {
        base = basesList.get(base.index + 1);
      }
    }

    return renderableBases;
  },

  /**
   * Return a new bbox adjusted to include the given point
   * @param {Object} bbox
   * @param {Number} x
   * @param {Number} y
   * @returns {Object}
   */
  updateBboxWithPoint(bbox, x, y) {
    return {
      x: bbox.x < x ? bbox.x : x,
      y: bbox.y < y ? bbox.y : y,
      width: bbox.x + bbox.width > x ? bbox.width : x - bbox.x,
      height: bbox.y + bbox.height > y ? bbox.height : y - bbox.y,
    };
  },

  /**
   * Return a new bbox including both given bboxes
   * @param {Object} bboxA
   * @param {Object} bboxB
   * @returns {Object}
   */
  updateBboxWithBbox(bboxA, bboxB) {
    const newBbox = {
      x: bboxA.x < bboxB.x ? bboxA.x : bboxB.x,
      y: bboxA.y < bboxB.y ? bboxA.y : bboxB.y,
    };

    newBbox.width = newBbox.x + Math.max(bboxA.x + bboxA.width, bboxB.x + bboxB.width);
    newBbox.height = newBbox.y + Math.max(bboxA.y + bboxA.height, bboxB.y + bboxB.height);

    return newBbox;
  },
};

export default renderUtils;
