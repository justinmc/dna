import React from 'react';
import BaseTypes from '../constants/base_types';
import CanvasMixin from '../mixins/canvas_mixin.jsx';
import colorUtils from '../utils/color_utils';

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
    color: React.PropTypes.string.isRequired,
    radius: React.PropTypes.number.isRequired,
    hovered: React.PropTypes.bool.isRequired,
    fontSize: React.PropTypes.number.isRequired,
  },

  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.fillStyle = this.props.color;
    ctx.beginPath();
    ctx.arc(this.props.x, this.props.y, this.props.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    if (this.props.hovered) {
      ctx.lineWidth = Math.round(this.props.radius / 10);
      ctx.stroke();
    }

    ctx.fillStyle = colorUtils.getContrastingColor(this.props.color);
    ctx.font = `${this.props.fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.props.type,
      this.props.x,
      this.props.y
    );
  },
});

export default CanvasBase;
