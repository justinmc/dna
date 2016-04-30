import React from 'react';
import ReactDOM from 'react-dom';
import CanvasBase from './components/canvas_base.jsx';

ReactDOM.render(
  <div>
    <h1>DNA Vis</h1>
    <canvas>
      <CanvasBase />
    </canvas>
  </div>,
  document.querySelector('.app')
);
