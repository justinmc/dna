import React from 'react';

const HighlightInput = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    hovereds: React.PropTypes.object,
    highlight: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  },

  getInitialState() {
    return {
      mouseOver: false,
    };
  },

  onMouseEnter() {
    this.setState({
      mouseOver: true,
    });
  },

  onMouseLeave() {
    this.setState({
      mouseOver: false,
    });
  },

  render() {
    let display;

    if (this.state.mouseOver || !this.props.highlight) {
      display = (
        <input
          className="highlighted-input__input"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      );
    } else {
      const highlightedValueChars = this.props.value.split('').map((character, index) => {
        if (this.props.hovereds.indexOf(index) !== -1) {
          return <span key={index} className="highlighted">{character}</span>;
        }
        return <span key={index}>{character}</span>;
      });
      display = (
        <div className="highlighted-input__input">
          {highlightedValueChars}
        </div>
      );
    }

    return (
      <div
        className={this.props.className}
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseLeave}
      >
        {display}
      </div>
    );
  },
});

export default HighlightInput;
