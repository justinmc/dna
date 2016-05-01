import React from 'react';
import ReactDOM from 'react-dom';

const CanvasMixin = {
  componentDidMount() {
    this.onUpdate();
  },

  componentDidUpdate() {
    this.onUpdate();
  },

  /**
   * Recurse through parent elements and try to find a canvas
   * Return false if no canvas found
   * @param {Element} el
   * @returns {Element}
   */
  getCanvasInParents(el) {
    if (!el) {
      return false;
    }
    if (el.tagName === 'CANVAS') {
      return el;
    }

    return this.getCanvasInParents(el.parentNode);
  },

  onUpdate() {
    const canvas = this.getCanvasInParents(ReactDOM.findDOMNode(this));

    // If not rendered inside canvas, do nothing
    if (!canvas || !canvas.getContext) {
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
