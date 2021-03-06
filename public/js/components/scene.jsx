import React from 'react';
import renderUtils from '../utils/render_utils';

const Scene = React.createClass({
  propTypes: {
    basesList: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    mouseX: React.PropTypes.number,
    mouseY: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    config: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      x: 0,
      y: 0,
    };
  },

  render() {
    const { bases, connectors } = renderUtils.renderBasesList({
      basesList: this.props.basesList,
      index: 0,
      x: this.props.x,
      y: this.props.y,
      mouseX: this.props.mouseX,
      mouseY: this.props.mouseY,
      width: this.props.width,
      height: this.props.height,
      config: this.props.config,
    });

    return (
      <span>
        {connectors}
        {bases}
      </span>
    );
  },
});

export default Scene;
