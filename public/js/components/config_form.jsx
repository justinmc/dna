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
        <div>
          {colorInputs.toArray()}
          <NumberInput
            number={this.props.config.get('baseRadius')}
            onSubmit={this.props.configActionsBound.changeBaseRadius}
          />
          <NumberInput
            number={this.props.config.get('fontSize')}
            onSubmit={this.props.configActionsBound.changeFontSize}
          />
          <NumberInput
            number={this.props.config.get('connectorThickness')}
            onSubmit={this.props.configActionsBound.changeConnectorThickness}
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    );
  },
});

export default ConfigForm;
