import React from 'react';

const ColorPicker = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
  },

  render() {
    return (
      <div className="color-picker">
        <input value={this.props.color} />
      </div>
    );
  },
});

export default ColorPicker;
