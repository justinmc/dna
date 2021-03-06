import React from 'react';
import CanvasBase from '../components/canvas_base.jsx';
import CanvasConnector from '../components/canvas_connector.jsx';
import baseStructures from '../constants/base_structures';
import geometryUtils from '../utils/geometry_utils';

const SPACING = 150;
const PAIR_THICKNESS_MULTIPLIER = 8;

const renderUtils = {
  /**
   * Render the indicated base and everything coming after it,
   * starting at the given point and direction
   * @param {Immutable.List} basesList
   * @param {Number} startIndex
   * @param {Number} x
   * @param {Number} y
   * @param {Number} startAngle in radians
   * @param {Object} config from config reducer
   * @returns {Object} with bases, connectors, hovereds, and bbox keys
   */
  renderBasesList(params) {
    const { index: startIndex, x, y, mouseX, mouseY, config } = params;
    const startAngle = params.angle || 0;
    let basesList = params.basesList;
    let bases = [];
    let connectors = [];
    let hovereds = [];
    let bbox = {
      x,
      y,
      width: 0,
      height: 0,
    };
    const exitPaths = [];

    const renderableBases = renderUtils.getRenderableBases(basesList, startIndex);

    renderableBases.forEach((base, index) => {
      const open = base.structure === baseStructures.PAIR_OPEN;
      const close = base.structure === baseStructures.PAIR_CLOSE;

      let baseX = x;
      let baseY = y;
      const angle = renderUtils.getAngle(startAngle, renderableBases.length, index);
      let previousPositions = {};

      if (index > 0) {
        previousPositions = bases[index - 1].props;
      }

      ({ x: baseX, y: baseY } = geometryUtils.getPositionAtAngleAndDistance(
        previousPositions.x || x,
        previousPositions.y || y,
        angle,
        SPACING
      ));

      if (open) {
        // Next angle is the one between this base and its pair
        const nextAngle = renderUtils.getAngle(
          startAngle,
          renderableBases.length,
          index + 1
        );
        // We should exit perpendicular to it
        const exitAngle = nextAngle - Math.PI / 2;

        // Recurse on this base later
        exitPaths.push({
          index: base.index + 1,
          x: baseX,
          y: baseY,
          angle: exitAngle,
        });

        // Add a connector to the base we'll recurse on
        const { x: exitX, y: exitY } = geometryUtils.getPositionAtAngleAndDistance(
          baseX,
          baseY,
          exitAngle,
          SPACING
        );
        connectors.push(
          <CanvasConnector
            key={`connector-recurse-${base.index}`}
            startX={baseX}
            startY={baseY}
            endX={exitX}
            endY={exitY}
            connectorThickness={config.get('connectorThickness')}
          />
        );
      } else if (close) {
        // Add the pair connector for the pair this is closing
        connectors.push(
          <CanvasConnector
            key={`connector-pair-${base.index}`}
            startX={baseX}
            startY={baseY}
            endX={previousPositions.x}
            endY={previousPositions.y}
            connectorThickness={config.get('connectorThickness') * PAIR_THICKNESS_MULTIPLIER}
          />
        );

        // Add the connector on the previous non-pair side, if any
        // if (base.pair.index !== base.index - 1) {
        const { x: pairPrevX, y: pairPrevY } = geometryUtils.getPositionAtAngleAndDistance(
          baseX,
          baseY,
          angle - Math.PI / 2,
          SPACING
        );
        connectors.push(
          <CanvasConnector
            key={`connector-pair-prev-${base.index}`}
            startX={baseX}
            startY={baseY}
            endX={pairPrevX}
            endY={pairPrevY}
            connectorThickness={config.get('connectorThickness')}
          />
        );
      }

      const hovered = geometryUtils.isIinsideCircle(
        baseX,
        baseY,
        config.get('baseRadius'),
        mouseX,
        mouseY
      );
      if (hovered) {
        hovereds.push(base.index);
      }

      bases.push(
        <CanvasBase
          key={`base-${base.index}`}
          x={baseX}
          y={baseY}
          type={base.type}
          color={config.get('colors').get(base.type)}
          fontSize={config.get('fontSize')}
          radius={config.get('baseRadius')}
          hovered={hovered}
        />
      );
      basesList = basesList.set(base.index, base.set('rendered', true));
      bbox = renderUtils.updateBboxWithBbox(bbox, {
        x: baseX - config.get('baseRadius'),
        y: baseY - config.get('baseRadius'),
        width: config.get('baseRadius') * 2,
        height: config.get('baseRadius') * 2,
      });

      // Render the user editable connector if clicked
      if (base.clicked) {
        connectors.push(
          <CanvasConnector
            key="user-editable-connector"
            startX={baseX}
            startY={baseY}
            endX={mouseX}
            endY={mouseY}
            connectorThickness={config.get('connectorThickness') * PAIR_THICKNESS_MULTIPLIER}
          />
        );
      }

      if (previousPositions.x && previousPositions.y) {
        connectors.push(
          <CanvasConnector
            key={`connector-${base.index}`}
            startX={previousPositions.x}
            startY={previousPositions.y}
            endX={baseX}
            endY={baseY}
            connectorThickness={config.get('connectorThickness')}
          />
        );
      }
    });

    // Recurse on exit points we found
    exitPaths.forEach((recurseData) => {
      const recurseResults = renderUtils.renderBasesList({
        basesList,
        index: recurseData.index,
        x: recurseData.x,
        y: recurseData.y,
        angle: recurseData.angle,
        mouseX,
        mouseY,
        config,
      });
      bases = bases.concat(recurseResults.bases);
      connectors = connectors.concat(recurseResults.connectors);
      hovereds = hovereds.concat(recurseResults.hovereds);
      bbox = renderUtils.updateBboxWithBbox(bbox, recurseResults.bbox);
    });

    return { bases, connectors, hovereds, bbox };
  },

  /**
   * Get the angle at which this point should be placed relative to previous
   * @param {Number} startAngle, radians
   * @param {Number} vertices
   * @param {Number} index
   * @returns {Number}
   */
  getAngle(startAngle, vertices, index) {
    // First point goes in given direction
    if (index === 0) {
      return startAngle;
    }

    // Subsequent points start turning
    const turnStartAngle = startAngle - Math.PI / 2;
    const turn = 2 * Math.PI / vertices;

    return turnStartAngle + index * turn;
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
   * Return a new bbox including both given bboxes
   * @param {Object} bboxA
   * @param {Object} bboxB
   * @returns {Object}
   */
  updateBboxWithBbox(bboxA, bboxB) {
    // Don't count empty bboxes
    if (bboxA.width === 0 && bboxA.height === 0) {
      return bboxB;
    }
    if (bboxB.width === 0 && bboxB.height === 0) {
      return bboxA;
    }

    const newBbox = {
      x: bboxA.x < bboxB.x ? bboxA.x : bboxB.x,
      y: bboxA.y < bboxB.y ? bboxA.y : bboxB.y,
    };

    const maxXA = bboxA.x + bboxA.width;
    const maxYA = bboxA.y + bboxA.height;
    const maxXB = bboxB.x + bboxB.width;
    const maxYB = bboxB.y + bboxB.height;

    newBbox.width = maxXA > maxXB ? maxXA - newBbox.x : maxXB - newBbox.x;
    newBbox.height = maxYA > maxYB ? maxYA - newBbox.y : maxYB - newBbox.y;

    return newBbox;
  },

  /**
   * Return the x, y, and scale in order to center this visualization
   * @param {Immutable.List} basesList
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Object} config from config reducer
   * @returns {Object} x, y, scale
   */
  getCenter(params) {
    const { bbox } = renderUtils.renderBasesList({
      basesList: params.basesList,
      index: 0,
      x: params.x,
      y: params.y,
      mouseX: params.mouseX,
      mouseY: params.mouseY,
      width: params.width,
      height: params.height,
      config: params.config,
    });

    // Scale to fit bbox
    const scaleToFit = {
      x: params.width / bbox.width,
      y: params.height / bbox.height,
    };

    const scale = Math.min(scaleToFit.x, scaleToFit.y);

    // Move the starting point so that the bbox center aligns with canvas center
    const centerOfCanvas = {
      x: params.width / 2 / scale,
      y: params.height / 2 / scale,
    };
    const centerOfBbox = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    return {
      x: centerOfCanvas.x - centerOfBbox.x + params.x,
      y: centerOfCanvas.y - centerOfBbox.y + params.y,
      scale,
    };
  },
};

export default renderUtils;
