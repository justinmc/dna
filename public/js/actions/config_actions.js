import actionConstants from '../constants/action_constants';

const configActions = {
  changeColor(type, color) {
    return {
      type: actionConstants.CHANGE_COLOR,
      colorType: type,
      color,
    };
  },
};

export default configActions;
