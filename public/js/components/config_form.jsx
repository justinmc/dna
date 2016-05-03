require('../../css/components/config_form.scss');

import React from 'react';
import ColorInput from './color_input.jsx';
import NumberInput from './number_input.jsx';

const ConfigForm = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    configActionsBound: React.PropTypes.object,
  },

  render() {
    const colorInputs = this.props.config.get('colors').map((color, type) => (
      <ColorInput
        key={type}
        type={type}
        color={color}
        configActionsBound={this.props.configActionsBound}
      />
    ));

    return (
      <div className="config-form">
        <div className="color-inputs">
          {colorInputs.toArray()}
        </div>
        <div className="number-inputs">
          <NumberInput
            title="base radius"
            number={this.props.config.get('baseRadius')}
            onSubmit={this.props.configActionsBound.changeBaseRadius}
          />
          <NumberInput
            title="font size"
            number={this.props.config.get('fontSize')}
            onSubmit={this.props.configActionsBound.changeFontSize}
          />
          <NumberInput
            title="connector thickness"
            number={this.props.config.get('connectorThickness')}
            onSubmit={this.props.configActionsBound.changeConnectorThickness}
          />
        </div>
      </div>
    );
  },
});

export default ConfigForm;
