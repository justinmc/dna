import { Record } from 'immutable';

const Base = Record({
  index: null,
  type: null,
  structure: null,
  pair: null,
  rendered: false,
  hovered: false,
  clicked: false,
});

export default Base;
