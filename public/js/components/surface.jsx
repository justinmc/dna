import React from 'react';
import CanvasBase from './canvas_base.jsx';

const Surface = React.createClass({
  propTypes: {
    sequence: React.PropTypes.string,
    dbn: React.PropTypes.string,
  },

  render() {
    const nucleotides = this.props.sequence.split('').map((nucleotide, index) => (
      <CanvasBase
        key={index}
        x={50 * index}
        y={50 * index}
      />
    ));

    return (
      <canvas width="500px" height="500px">
        {nucleotides}
      </canvas>
    );
  },
});

export default Surface;
