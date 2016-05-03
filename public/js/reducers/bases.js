import { List, Map } from 'immutable';
import actionConstants from '../constants/action_constants';
import baseUtils from '../utils/base_utils';
import dbnUtils from '../utils/dbn_utils';

const defaultSequence = 'GAGTACAATATGTACCG';
const defaultDbn = '..((((.....))))..';
const initialState = Map({
  dataError: '',
  list: List(),
});

function bases(state = initialState, action) {
  switch (action.type) {
    case actionConstants.CLICK_BASE:
      let oldClickedBase = state.get('list').find((base) => base.clicked);
      let newClickedBase;

      // Remove old clicks
      let newState = state.set('list', state.get('list').map((base) =>
        base.set('clicked', false)
      ));

      if (typeof action.baseIndex === 'number') {
        newClickedBase = newState.get('list').get(action.baseIndex).set('clicked', true);

        // If trying to match a pair
        if (oldClickedBase) {
          if (baseUtils.ableToPair(oldClickedBase, newClickedBase)) {
            ({ baseA: oldClickedBase, baseB: newClickedBase } = baseUtils.pair(
              oldClickedBase,
              newClickedBase
            ));

            newState = newState.set('list', newState.get('list').set(
              oldClickedBase.index,
              oldClickedBase
            ));
            newState = newState.set('list', newState.get('list').set(
              newClickedBase.index,
              newClickedBase
            ));

            const sequence = newState.get('list').map((base) => base.type).join('');
            const dbn = newState.get('list').map((base) => base.structure).join('');
            const url = `/?sequence=${sequence}&dbn=${dbn}`;
            window.history.pushState({}, '', url);
          }
        // If not trying to match, just set the base as clicked
        } else {
          newState = newState.set('list', newState.get('list').set(
            newClickedBase.index,
            newClickedBase
          ));
        }
      }

      return newState;

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
