require('../../css/components/bases_form.scss');

import React from 'react';

const BasesForm = React.createClass({
  propTypes: {
    basesActionsBound: React.PropTypes.object,
    dbn: React.PropTypes.string,
    sequence: React.PropTypes.string,
    dataError: React.PropTypes.string,
  },

  getInitialState() {
    return {
      sequence: '',
      dbn: '',
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      sequence: nextProps.sequence,
      dbn: nextProps.dbn,
    });
  },

  onChangeSequence(e) {
    this.setState({
      sequence: e.target.value,
    });
  },

  onChangeDbn(e) {
    this.setState({
      dbn: e.target.value,
    });
  },

  onSubmit(e) {
    e.preventDefault();
    this.props.basesActionsBound.submitBasesForm(this.state.sequence, this.state.dbn);
  },

  render() {
    return (
      <form className="bases-form" onSubmit={this.onSubmit}>
        <div className="input-container">
          <input
            className="input-sequence"
            value={this.state.sequence}
            onChange={this.onChangeSequence}
          />
          <input
            className="input-dbn"
            value={this.state.dbn}
            onChange={this.onChangeDbn}
          />
          <div className="error">{this.props.dataError}</div>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  },
});

export default BasesForm;
