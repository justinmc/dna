import React from 'react';
import BaseTypes from '../constants/base_types';
import CanvasMixin from '../mixins/canvas_mixin.jsx';

const CanvasBase = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf([
      BaseTypes.A,
      BaseTypes.G,
      BaseTypes.T,
      BaseTypes.C,
      BaseTypes.N,
    ]).isRequired,
    radius: React.PropTypes.number.isRequired,
    hovered: React.PropTypes.bool.isRequired,
  },

  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.fillStyle = this.props.hovered ? 'red' : '#000000';
    ctx.beginPath();
    ctx.arc(this.props.x, this.props.y, this.props.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '48px serif';
    ctx.fillText(
      this.props.type,
      this.props.x - this.props.radius / 3,
      this.props.y + this.props.radius / 4
    );
  },
});

export default CanvasBase;
