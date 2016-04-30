import React from 'react';
import CanvasMixin from '../mixins/canvas_mixin.jsx';

const CanvasBaseReact = React.createClass({
  mixins: [CanvasMixin],

  renderOnCanvas(ctx) {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  },
});

export default CanvasBaseReact;
