require('../../css/components/bases_form.scss');

import React from 'react';
import HighlightInput from './highlight_input.jsx';

const BasesForm = React.createClass({
  propTypes: {
    basesActionsBound: React.PropTypes.object,
    dbn: React.PropTypes.string,
    sequence: React.PropTypes.string,
    hovereds: React.PropTypes.object,
    dataError: React.PropTypes.string,
  },

  getInitialState() {
    return {
      sequence: '',
      dbn: '',
    };
  },

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (nextProps.sequence !== this.props.sequence) {
      newState.sequence = nextProps.sequence;
    }
    if (nextProps.dbn !== this.props.dbn) {
      newState.dbn = nextProps.dbn;
    }

    this.setState(newState);
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
          <HighlightInput
            className="input-sequence"
            value={this.state.sequence}
            hovereds={this.props.hovereds}
            highlight={this.state.sequence === this.props.sequence}
            onChange={this.onChangeSequence}
          />
          <HighlightInput
            className="input-dbn"
            value={this.state.dbn}
            hovereds={this.props.hovereds}
            highlight={this.state.dbn === this.props.dbn}
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
