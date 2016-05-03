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

    const errorMessage = error ? error.message : '';

    if (!error) {
      const url = `/?sequence=${sequence}&dbn=${dbn}`;
      window.history.pushState({}, '', url);
    }

    return {
      type: actionConstants.SUBMIT_BASES_FORM,
      basesList,
      error: errorMessage,
    };
  },

  hoverBases(baseIndices) {
    return {
      type: actionConstants.HOVER_BASES,
      baseIndices,
    };
  },
};

export default appActions;
