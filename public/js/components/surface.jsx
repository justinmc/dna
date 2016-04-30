require('../../css/components/surface.scss');

import React from 'react';
import CanvasBase from './canvas_base.jsx';
import CanvasConnector from './canvas_connector.jsx';
import baseStructures from '../constants/base_structures';

const Surface = React.createClass({
  propTypes: {
    sequence: React.PropTypes.string,
    bases: React.PropTypes.object,
  },

  render() {
    const bases = [];
    const connectors = [];
    const openQueue = [];

    this.props.bases.forEach((base, index) => {
      const open = base.structure === baseStructures.PAIR_OPEN;
      const close = base.structure === baseStructures.PAIR_CLOSE;

      let previousPositions;
      if (index > 0) {
        previousPositions = bases[index - 1].props;
      } else {
        previousPositions = {
          x: 50,
          y: 100,
        };
      }

      let x = previousPositions.x + 150;
      let y = previousPositions.y;

      if (open) {
        openQueue.push({ x, y });
      } else if (close) {
        if (!openQueue.length) {
          throw new Error('Mismatching open/close in structure');
        }

        // dequeue
        const openPositions = openQueue[0];
        x = openPositions.x;
        y = openPositions.y + 150;
        openQueue.splice(0, 1);

        connectors.push(
          <CanvasConnector
            key={`connector-close-${index}`}
            startX={openPositions.x}
            startY={openPositions.y}
            endX={x}
            endY={y}
          />
        );
      }

      bases.push(
        <CanvasBase
          key={`base-${index}`}
          x={x}
          y={y}
        />
      );

      connectors.push(
        <CanvasConnector
          key={`connector-${index}`}
          startX={previousPositions.x}
          startY={previousPositions.y}
          endX={x}
          endY={y}
        />
      );
    });

    return (
      <div className="surface">
        <canvas width="1270px" height="560px">
          {bases}
          {connectors}
        </canvas>
      </div>
    );
  },
});

export default Surface;
