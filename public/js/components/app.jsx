import React from 'react';
import { connect } from 'react-redux';
// import ColorPicker from './color_picker.jsx';
// import InputDbn from './input_dbn.jsx';
import Surface from './surface.jsx';

const App = React.createClass({
  propTypes: {
    bases: React.PropTypes.object,
  },

  render() {
    /*
          <InputDbn dbn={sequence} />
          <InputDbn dbn={dbn} />
    */
    return (
      <div className="app">
        <div className="ui">
          <h1>DNA Vis</h1>
        </div>
        <Surface bases={this.props.bases} />
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
