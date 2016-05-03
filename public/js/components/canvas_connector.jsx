import React from 'react';
import CanvasMixin from '../mixins/canvas_mixin.jsx';

const CanvasConnector = React.createClass({
  propTypes: {
    startX: React.PropTypes.number.isRequired,
    startY: React.PropTypes.number.isRequired,
    endX: React.PropTypes.number.isRequired,
    endY: React.PropTypes.number.isRequired,
    connectorThickness: React.PropTypes.number.isRequired,
  },

  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(this.props.startX, this.props.startY);
    ctx.lineTo(this.props.endX, this.props.endY);
    ctx.closePath();
    ctx.lineWidth = this.props.connectorThickness;
    ctx.stroke();
  },
});

export default CanvasConnector;
