import React from 'react';
import InputDbn from './input_dbn.jsx';
import Surface from './surface.jsx';

const App = React.createClass({
  render() {
    const sequence = 'GAGUACAAUAUGUACCG';
    const dbn =      '..((((.....))))..';

    return (
      <div>
        <h1>DNA Vis</h1>
        <InputDbn dbn={sequence} />
        <InputDbn dbn={dbn} />
        <Surface dbn={dbn} sequence={sequence} />
      </div>
    );
  },
});

export default App;
