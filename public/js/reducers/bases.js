import { List, Map } from 'immutable';
import actionConstants from '../constants/action_constants';
import dbnUtils from '../utils/dbn_utils';

const defaultSequence = 'GAGTACAATATGTACCG';
const defaultDbn = '..((((.....))))..';
const initialState = Map({
  dataError: '',
  list: List(),
});

function bases(state = initialState, action) {
  switch (action.type) {
    case actionConstants.HOVER_BASES:
      return state.set('list', state.get('list').map((base) => {
        const hovered = action.baseIndices.indexOf(base.index) !== -1;
        return base.set('hovered', hovered);
      }));

    case actionConstants.POP_STATE:
      if (typeof action.sequence !== 'string' || typeof action.dbn !== 'string') {
        action.sequence = defaultSequence;
        action.dbn = defaultDbn;
      }

      return state.merge({
        list: dbnUtils.createStructure(action.sequence, action.dbn),
      });

    case actionConstants.START_APP:
      if (typeof action.sequence !== 'string' || typeof action.dbn !== 'string') {
        action.sequence = defaultSequence;
        action.dbn = defaultDbn;
      }

      return state.merge({
        list: dbnUtils.createStructure(action.sequence, action.dbn),
      });

    case actionConstants.SUBMIT_BASES_FORM:
      if (action.error) {
        return state.set('dataError', action.error);
      }

      return state.merge({
        list: action.basesList,
        dataError: null,
      });

    default:
      return state;
  }
}

export default bases;
