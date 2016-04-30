import React from 'react';
import CanvasMixin from '../mixins/canvas_mixin.jsx';

const CanvasBaseReact = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  },

  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.arc(this.props.x, this.props.y, 50, 0, Math.PI * 2);
    ctx.fill();
  },
});

export default CanvasBaseReact;
