import React from 'react';
import { connect } from 'react-redux';
// import ColorPicker from './color_picker.jsx';
import InputDbn from './input_dbn.jsx';
import Surface from './surface.jsx';
import appActions from '../actions/app_actions';

const App = React.createClass({
  propTypes: {
    bases: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  },

  componentDidMount() {
    this.props.dispatch(appActions.startApp());
  },

  render() {
    return (
      <div className="app">
        <div className="ui">
          <h1>DNA Vis</h1>
          <InputDbn dbn={this.props.bases.get('sequence')} />
          <InputDbn dbn={this.props.bases.get('dbn')} />
        </div>
        <Surface basesList={this.props.bases.get('list')} />
      </div>
    );
  },
});

function select(state) {
  return {
    bases: state.bases,
  };
}

export default connect(select)(App);
