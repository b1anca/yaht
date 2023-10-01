import React, { forwardRef } from "react";
import PropTypes from "prop-types";

export const Label = ({ type, text }) => (
  <label
    htmlFor={type}
    className="block text-sm font-semibold leading-6 mb-2 text-zinc-600"
  >
    {text}
  </label>
);

const Input = forwardRef((props, ref) => {
  const { type, required = false, label, ...rest } = props;

  return (
    <div className="mb-6">
      <Label type={type} text={label} />
      <input
        id={type}
        name={rest.name}
        type={type}
        className="bg-transparent appearance-none text-zinc-600 rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-lime-600 ring-1 ring-slate-200"
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

Label.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Input;
