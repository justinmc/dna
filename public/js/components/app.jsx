import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ColorPicker from './color_picker.jsx';
import BasesForm from './bases_form.jsx';
import ConfigForm from './config_form.jsx';
import Surface from './surface.jsx';
import appActions from '../actions/app_actions';
import basesActions from '../actions/bases_actions';
import configActions from '../actions/config_actions';

const App = React.createClass({
  propTypes: {
    bases: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    config: React.PropTypes.object,
  },

  componentDidMount() {
    this.props.dispatch(appActions.startApp());

    window.addEventListener('popstate', this.onPopState);
  },

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
  },

  onPopState() {
    this.props.dispatch(appActions.popState());
  },

  render() {
    return (
      <div className="app">
        <div className="ui">
          <h1>Justin's DNA Visualizer</h1>
          <div className="form-container">
            <BasesForm
              basesActionsBound={bindActionCreators(basesActions, this.props.dispatch)}
              sequence={this.props.bases.get('sequence')}
              dbn={this.props.bases.get('dbn')}
              dataError={this.props.bases.get('dataError')}
            />
            <ConfigForm
              config={this.props.config}
              configActionsBound={bindActionCreators(configActions, this.props.dispatch)}
            />
          </div>
        </div>
        <Surface
          basesList={this.props.bases.get('list')}
          config={this.props.config}
        />
      </div>
    );
  },
});

function select(state) {
  return {
    bases: state.bases,
    config: state.config,
  };
}

export default connect(select)(App);
