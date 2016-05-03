import { Map } from 'immutable';
import actionConstants from '../constants/action_constants';
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
  fontSize: 48,
  connectorThickness: 1,
});

function config(state = initialState, action) {
  switch (action.type) {
    case actionConstants.CHANGE_BASE_RADIUS:
      return state.set('baseRadius', action.baseRadius);

    case actionConstants.CHANGE_COLOR:
      return state.set('colors', state.get('colors').set(action.colorType, action.color));

    case actionConstants.CHANGE_CONNECTOR_THICKNESS:
      return state.set('connectorThickness', action.connectorThickness);

    case actionConstants.CHANGE_FONT_SIZE:
      return state.set('fontSize', action.fontSize);

    default:
      return state;
  }
}

export default config;
