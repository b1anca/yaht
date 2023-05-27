import React, { forwardRef } from "react"
import PropTypes from 'prop-types';

const Input = forwardRef((props, ref) => {
  const { type, required = false, label, ...rest } = props

  return (
    <div className='form-group'>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        className='form-input border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4'
        required={required}
        ref={ref}
        {...rest}
      />
    </div>
  )
})


Input.displayName = 'Input'

Input.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input