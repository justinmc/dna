// import actionConstants from '../constants/action_constants';
import dbnUtils from '../utils/dbn_utils';

const sequence = 'GAGTACAATATGTACCG';
const dbn = '..((((.....))))..';

const initialState = dbnUtils.createStructure(sequence, dbn);

function bases(state = initialState, action) {
  switch (action.type) {
    case 'asdf':
      return state;

    default:
      return state;
  }
}

export default bases;
