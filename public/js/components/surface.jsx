require('../../css/components/surface.scss');

import React from 'react';
import CanvasBase from './canvas_base.jsx';

const Surface = React.createClass({
  propTypes: {
    sequence: React.PropTypes.string,
    bases: React.PropTypes.object,
  },

  render() {
    // const openQueue = [];

    const bases = this.props.bases.map((base, index) => {
      // const open = this.props.dbn[index] === '(';
      // const close = this.props.dbn[index] === ')';

      return (
        <CanvasBase
          key={index}
          x={50 + 150 * index}
          y={100}
        />
      );
    });

    return (
      <div className="surface">
        <canvas width="1270px" height="560px">
          {bases}
        </canvas>
      </div>
    );
  },
});

export default Surface;
