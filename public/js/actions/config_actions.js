import actionConstants from '../constants/action_constants';

const configActions = {
  changeColor(type, color) {
    return {
      type: actionConstants.CHANGE_COLOR,
      colorType: type,
      color,
    };
  },

  changeBaseRadius(baseRadius) {
    return {
      type: actionConstants.CHANGE_BASE_RADIUS,
      baseRadius,
    };
  },

  changeFontSize(fontSize) {
    return {
      type: actionConstants.CHANGE_FONT_SIZE,
      fontSize,
    };
  },

  changeConnectorThickness(connectorThickness) {
    return {
      type: actionConstants.CHANGE_CONNECTOR_THICKNESS,
      connectorThickness,
    };
  },
};

export default configActions;
