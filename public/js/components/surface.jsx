require('../../css/components/surface.scss');

import React from 'react';
import Scene from './scene.jsx';

const Surface = React.createClass({
  propTypes: {
    basesList: React.PropTypes.object,
  },

  getInitialState() {
    return {
      x: 0,
      y: 0,
      dragX: null,
      dragY: null,
      dragging: false,
    };
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
  },

  componentWillUpdate() {
    // Clear the canvas between renders
    const canvas = this.refs.canvas;

    if (!canvas.getContext) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
  },

  onMouseDown(e) {
    this.setState({
      dragging: true,
      dragX: e.clientX,
      dragY: e.clientY,
    });
  },

  onMouseMove(e) {
    if (this.state.dragging) {
      this.setState({
        x: this.state.x + e.clientX - this.state.dragX,
        y: this.state.y + e.clientY - this.state.dragY,
        dragX: e.clientX,
        dragY: e.clientY,
      });
    }
  },

  onMouseUp() {
    this.setState({
      dragging: false,
      dragX: null,
      dragY: null,
    });
  },

  render() {
    return (
      <div className="surface">
        <canvas
          ref="canvas"
          width="1270px"
          height="560px"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          <Scene
            x={this.state.x}
            y={this.state.y}
            basesList={this.props.basesList}
          />
        </canvas>
      </div>
    );
  },
});

export default Surface;
