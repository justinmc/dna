import React from 'react';
import ReactDOM from 'react-dom';

const CanvasMixin = {
  componentDidMount() {
    this.onUpdate();
  },

  componentDidUpdate() {
    this.onUpdate();
  },

  onUpdate() {
    const el = ReactDOM.findDOMNode(this);
    const canvas = el.parentNode;

    // If not rendered inside canvas, do nothing
    if (!canvas.getContext) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.renderOnCanvas(ctx);
    }
  },

  render() {
    return <span></span>;
  },
};

export default CanvasMixin;
