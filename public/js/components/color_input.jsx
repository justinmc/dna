import React from 'react';
import colorUtils from '../utils/color_utils';

const ColorInput = React.createClass({
  propTypes: {
    configActionsBound: React.PropTypes.object,
    type: React.PropTypes.string,
    color: React.PropTypes.string,
  },

  getInitialState() {
    return {
      color: '',
    };
  },

  onComponentWillReceiveProps() {
    this.setState({
      color: '',
    });
  },

  onChangeColor(e) {
    this.setState({
      color: e.target.value,
    });
  },

  onKeyPress(e) {
    if (e.key === 'Enter') {
      if (colorUtils.isValidColor(e.target.value)) {
        this.props.configActionsBound.changeColor(this.props.type, this.state.color);
      }
    }
  },

  render() {
    return (
      <input
        className="color-input"
        value={this.state.color || this.props.color}
        onChange={this.onChangeColor}
        onKeyPress={this.onKeyPress}
      />
    );
  },
});

export default ColorInput;
