import { Map } from 'immutable';
import baseTypes from '../constants/base_types';

const initialState = Map({
  colors: Map({
    [baseTypes.A]: '#ff0000',
    [baseTypes.G]: '#00ff00',
    [baseTypes.T]: '#0000ff',
    [baseTypes.C]: '#ff00ff',
    [baseTypes.N]: '#000000',
  }),
  baseRadius: 50,
  fontSize: 10,
  connectorWidth: 1,
});

function config(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default config;
