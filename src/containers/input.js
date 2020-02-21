import React from "react";
import PropTypes from 'prop-types';

const Input = (props) => {
    console.log(props)
    return (  
  <div className="form-group">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <input
      className="form-input"
      name={props.name}
      type={props.type}
      title={props.type}
      value={props.value}
      valueerror={props.valueerror}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
    <div className={props.className}>{props.valueerror}</div>
  </div>
);
    }
Input.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']).isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    placeholder: PropTypes.string,
  };

export default Input;