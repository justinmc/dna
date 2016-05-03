import { Map } from 'immutable';
import baseTypes from '../constants/base_types';

const initialState = Map({
  colors: Map({
    [baseTypes.A]: '#e3261c',
    [baseTypes.G]: '#0e791d',
    [baseTypes.T]: '#1c42e3',
    [baseTypes.C]: '#751ce3',
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
