require('../../css/components/surface.scss');

import React from 'react';
import Scene from './scene.jsx';
import renderUtils from '../utils/render_utils';

const WIDTH = 1270;
const HEIGHT = 560;

const Surface = React.createClass({
  propTypes: {
    basesList: React.PropTypes.object,
  },

  getInitialState() {
    return {
      x: 0,
      y: 0,
      mouseX: 0,
      mouseY: 0,
      dragging: false,
      scale: 1,
    };
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
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
    const canvasPosition = e.target.getBoundingClientRect();
    const newState = {
      mouseX: e.clientX - canvasPosition.left,
      mouseY: e.clientY - canvasPosition.top,
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
    const PADDING = 50;
    const { bbox } = renderUtils.renderBasesList({
      basesList: this.props.basesList,
      index: 0,
      x: 0,
      y: 0,
      mouseX: 0,
      mouseY: 0,
    });
    const newScaleX = WIDTH / bbox.width;
    const newScaleY = HEIGHT / bbox.height;
    let newScale;

    if (Math.abs(1 - newScaleX) > Math.abs(1 - newScaleY)) {
      newScale = newScaleX;
    } else {
      newScale = newScaleX;
    }

    const newWidth = WIDTH / newScale;
    const newHeight = HEIGHT / newScale;

    this.setState({
      x: bbox.x - (newWidth - bbox.width) / 2,
      y: bbox.y - (newHeight - bbox.height) / 2,
      scale: newScale,
    });
  },

  render() {
    //console.log('mousies', this.state.mouseX / this.state.scale, this.state.mouseY / this.state.scale);
    //console.log('render at', this.state.x, this.state.y);
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
          />
        </canvas>
        <button onClick={this.clickCenter}>Recenter</button>
      </div>
    );
  },
});

export default Surface;
