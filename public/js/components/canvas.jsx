import React from 'react';

const Canvas = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element,
    ]),
  },

  render() {
    return (
      <canvas ref="canvas">
        {this.props.children}
      </canvas>
    );
  },
});

export default Canvas;
