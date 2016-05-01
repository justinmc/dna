import React from 'react';
import CanvasBase from './canvas_base.jsx';
import CanvasConnector from './canvas_connector.jsx';
import baseStructures from '../constants/base_structures';
import geometryUtils from '../utils/geometry_utils';

const SPACING = 150;

const Scene = React.createClass({
  propTypes: {
    bases: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      x: 0,
      y: 0,
    };
  },

  render() {
    const bases = [];
    const connectors = [];
    const openStack = [];
    let angle = 0;

    this.props.bases.forEach((base, index) => {
      const open = base.structure === baseStructures.PAIR_OPEN;
      const close = base.structure === baseStructures.PAIR_CLOSE;

      let previousPositions;
      if (index > 0) {
        previousPositions = bases[index - 1].props;
      } else {
        previousPositions = {
          x: this.props.x + 50,
          y: this.props.y + 100,
        };
      }

      let { x, y } = geometryUtils.getPositionAtAngleAndDistance(
        previousPositions.x,
        previousPositions.y,
        angle,
        SPACING
      );

      if (open) {
        openStack.push({ x, y });
      } else if (close) {
        if (!openStack.length) {
          throw new Error('Mismatching open/close in structure');
        }

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
      }

      bases.push(
        <CanvasBase
          key={`base-${index}`}
          x={x}
          y={y}
          type={base.type}
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
      <span>
        {bases}
        {connectors}
      </span>
    );
  },
});

export default Scene;
