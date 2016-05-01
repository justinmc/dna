import actionConstants from '../constants/action_constants';
import dbnUtils from '../utils/dbn_utils';

const appActions = {
  submitBasesForm(sequence, dbn) {
    let basesList;
    let error;

    try {
      basesList = dbnUtils.createStructure(sequence, dbn);
    } catch (err) {
      error = err;
    }

    return {
      type: actionConstants.SUBMIT_BASES_FORM,
      sequence,
      dbn,
      basesList,
      error: error ? error.message : '',
    };
  },
};

export default appActions;
