import React from 'react';
import PropTypes from 'prop-types';
import './Input.less';
export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { label, placeholder, name, type,onChange,value,disabled  } = this.props;
    return (
      <div>
        <label className={'input-label'}>{label}</label>
        <input className={'input-form'}type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
        {this.props.button}
      </div>
    )
  }
}
const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.boolean,
}
Input.propTypes = propTypes;
