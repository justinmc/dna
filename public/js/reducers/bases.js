import { List, Map } from 'immutable';
import actionConstants from '../constants/action_constants';
import dbnUtils from '../utils/dbn_utils';

const initialState = Map({
  dataError: '',
  sequence: 'GAGTACAATATGTACCG',
  dbn: '..((((.....))))..',
  list: List(),
});

function bases(state = initialState, action) {
  switch (action.type) {
    case actionConstants.POP_STATE:
      if (typeof action.sequence !== 'string' || typeof action.dbn !== 'string') {
        action.sequence = initialState.get('sequence');
        action.dbn = initialState.get('dbn');
      }

      return state.merge({
        sequence: action.sequence,
        dbn: action.dbn,
        list: dbnUtils.createStructure(action.sequence, action.dbn),
      });

    case actionConstants.START_APP:
      if (typeof action.sequence !== 'string' || typeof action.dbn !== 'string') {
        action.sequence = initialState.get('sequence');
        action.dbn = initialState.get('dbn');
      }

      return state.merge({
        sequence: action.sequence,
        dbn: action.dbn,
        list: dbnUtils.createStructure(action.sequence, action.dbn),
      });

    case actionConstants.SUBMIT_BASES_FORM:
      if (action.error) {
        return state.set('dataError', action.error);
      }

      return state.merge({
        list: action.basesList,
        sequence: action.sequence,
        dbn: action.dbn,
        dataError: null,
      });

    default:
      return state;
  }
}

export default bases;
