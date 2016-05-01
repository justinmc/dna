import { List, Map } from 'immutable';
import actionConstants from '../constants/action_constants';
import dbnUtils from '../utils/dbn_utils';

const initialState = Map({
  sequence: null,
  dbn: null,
  list: List(),
});

function bases(state = initialState, action) {
  switch (action.type) {
    case actionConstants.START_APP:
      if (typeof action.sequence !== 'string' || typeof action.dbn !== 'string') {
        return state;
      }

      return state.merge({
        sequence: action.sequence,
        dbn: action.dbn,
        list: dbnUtils.createStructure(action.sequence, action.dbn),
      });

    default:
      return state;
  }
}

export default bases;