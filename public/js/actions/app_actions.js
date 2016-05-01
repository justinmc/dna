import qs from 'query-string';
import actionConstants from '../constants/action_constants';

const appActions = {
  startApp() {
    const query = qs.parse(window.location.search);

    return {
      type: actionConstants.START_APP,
      sequence: query.sequence,
      dbn: query.dbn,
    };
  },
};

export default appActions;
