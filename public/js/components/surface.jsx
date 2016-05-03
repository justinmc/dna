require('../../css/components/surface.scss');

import React from 'react';
import Scene from './scene.jsx';
import renderUtils from '../utils/render_utils';

const WIDTH = 1270;
const HEIGHT = 560;

const Surface = React.createClass({
  propTypes: {
    basesList: React.PropTypes.object,
    config: React.PropTypes.object,
  },

  getInitialState() {
    return {
      x: 0,
      y: 0,
      mouseX: 0,
      mouseY: 0,
      dragging: false,
      scale: 1,
      centered: false,
    };
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
  },

  componentWillReceiveProps(nextProps) {
    if (!this.state.centered) {
      const { x, y, scale } = renderUtils.getCenter({
        basesList: nextProps.basesList,
        x: this.state.x,
        y: this.state.y,
        width: WIDTH,
        height: HEIGHT,
        config: nextProps.config,
      });

      this.setState({
        x, y, scale, centered: true,
      });
    }
  },

  componentWillUpdate(nextProps, nextState) {
    // Clear the canvas between renders
    const canvas = this.refs.canvas;

    if (!canvas.getContext) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(nextState.scale, 0, 0, nextState.scale, 0, 0);
  },

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
  },

  onMouseDown() {
    this.setState({
      dragging: true,
    });
  },

  onMouseMove(e) {
    const canvasPosition = this.refs.canvas.getBoundingClientRect();
    const canvasStretchX = WIDTH / canvasPosition.width;
    const canvasStretchY = HEIGHT / canvasPosition.height;

    // Set mouse coordinates relative to canvas, considering position offset and deformation
    const newState = {
      mouseX: (e.clientX - canvasPosition.left) * canvasStretchX,
      mouseY: (e.clientY - canvasPosition.top) * canvasStretchY,
    };

    if (this.state.dragging) {
      newState.x = this.state.x + (newState.mouseX - this.state.mouseX) / this.state.scale;
      newState.y = this.state.y + (newState.mouseY - this.state.mouseY) / this.state.scale;
    }

    this.setState(newState);
  },

  onMouseUp() {
    this.setState({
      dragging: false,
    });
  },

  onWheel(e) {
    e.preventDefault();

    const normalizedScaleChange = e.deltaY / 1000;

    this.setState({
      scale: this.state.scale + normalizedScaleChange,
    });
  },

  clickCenter() {
    this.setState(renderUtils.getCenter({
      basesList: this.props.basesList,
      x: this.state.x,
      y: this.state.y,
      width: WIDTH,
      height: HEIGHT,
      config: this.props.config,
    }));
  },

  render() {
    return (
      <div className="surface">
        <canvas
          ref="canvas"
          width={`${WIDTH}px`}
          height={`${HEIGHT}px`}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onWheel={this.onWheel}
        >
          <Scene
            x={this.state.x}
            y={this.state.y}
            mouseX={this.state.mouseX / this.state.scale}
            mouseY={this.state.mouseY / this.state.scale}
            basesList={this.props.basesList}
            width={WIDTH}
            height={HEIGHT}
            config={this.props.config}
          />
        </canvas>
        <button onClick={this.clickCenter}>Recenter</button>
      </div>
    );
  },
});

export default Surface;
