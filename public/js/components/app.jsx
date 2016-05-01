import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ColorPicker from './color_picker.jsx';
import BasesForm from './bases_form.jsx';
import Surface from './surface.jsx';
import appActions from '../actions/app_actions';
import basesActions from '../actions/bases_actions';

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
          <BasesForm
            basesActionsBound={bindActionCreators(basesActions, this.props.dispatch)}
            sequence={this.props.bases.get('sequence')}
            dbn={this.props.bases.get('dbn')}
            dataError={this.props.bases.get('dataError')}
          />
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
