require('../../css/components/config_form.scss');

import React from 'react';
import ColorInput from './color_input.jsx';

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
        </div>
        <button type="submit">Submit</button>
      </div>
    );
  },
});

export default ConfigForm;
