import React from 'react';
import CanvasMixin from '../mixins/canvas_mixin.jsx';

const CanvasConnector = React.createClass({
  propTypes: {
    startX: React.PropTypes.number,
    startY: React.PropTypes.number,
    endX: React.PropTypes.number,
    endY: React.PropTypes.number,
  },

  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.props.startX, this.props.startY);
    ctx.lineTo(this.props.endX, this.props.endY);
    ctx.closePath();
    ctx.stroke();
  },
});

export default CanvasConnector;
