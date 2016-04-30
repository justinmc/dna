import React from 'react';

const InputDBN = React.createClass({
  propTypes: {
    dbn: React.PropTypes.string,
  },

  render() {
    return (
      <div>
        <input
          className="input-dbn"
          value={this.props.dbn}
        />
      </div>
    );
  },
});

export default InputDBN;
