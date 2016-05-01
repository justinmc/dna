import React from 'react';
import InputDbn from './input_dbn.jsx';
import Surface from './surface.jsx';
import dbnUtils from '../utils/dbn_utils';

const App = React.createClass({
  render() {
    const sequence = 'GAGTACAATATGTACCG';
    const dbn = '..((((.....))))..';
    const bases = dbnUtils.createStructure(sequence, dbn);

    return (
      <div className="app">
        <div className="ui">
          <h1>DNA Vis</h1>
          <InputDbn dbn={sequence} />
          <InputDbn dbn={dbn} />
        </div>
        <Surface bases={bases} dbn={dbn} sequence={sequence} />
      </div>
    );
  },
});

export default App;
