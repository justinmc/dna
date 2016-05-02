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
    });

    return { bases, connectors };
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

  /*
  getBaseEl(x, y, type) {
    return (
      <CanvasBase
        key={`base-${index}`}
        x={x}
        y={y}
        type={type}
      />
    );
  },
  */
};

export default renderUtils;
