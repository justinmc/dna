import React from 'react';
import renderUtils from '../utils/render_utils';

const Scene = React.createClass({
  propTypes: {
    basesList: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      x: 0,
      y: 0,
    };
  },

  render() {
    const { bases, connectors } = renderUtils.renderBasesList(
      this.props.basesList,
      0,
      this.props.x,
      this.props.y,
      0
    );

    return (
      <span>
        {bases}
        {connectors}
      </span>
    );
  },
});

export default Scene;
