import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = ({ type, loading, children, ...rest }) => {
  return (
    <button
      type={type}
      className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
      disabled={loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
