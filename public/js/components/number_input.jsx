import React from 'react';

const NumberInput = React.createClass({
  propTypes: {
    number: React.PropTypes.number,
    onSubmit: React.PropTypes.func,
  },

  getInitialState() {
    return {
      color: '',
    };
  },

  onComponentWillReceiveProps() {
    this.setState({
      number: '',
    });
  },

  onChange(e) {
    this.setState({
      number: e.target.value,
    });
  },

  onKeyPress(e) {
    if (e.key === 'Enter') {
      const number = parseInt(e.target.value, 10);

      // Accept anything but NaN
      if (!isNaN(number)) {
        this.props.onSubmit(number);
      }
    }
  },

  render() {
    return (
      <input
        type="number"
        className="number-input"
        value={this.state.number || this.props.number}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    );
  },
});

export default NumberInput;
