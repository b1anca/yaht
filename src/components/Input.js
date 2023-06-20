import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef((props, ref) => {
  const { type, required = false, label, ...rest } = props;

  return (
    <div className="mb-6">
      <label htmlFor={type} className="block text-sm font-semibold leading-6">
        {label}
      </label>
      <input
        id={type}
        name={rest.name}
        type={type}
        className="bg-transparent mt-2 appearance-none text-slate-100 rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        required={required}
        ref={ref}
        aria-label={rest.name}
        {...rest}
      />
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input;
