import React from "react";
import PropTypes from "prop-types";

const Error = ({ children, ...props }) => {
  return (
    <div
      className="text-sm text-rose-500 mb-4 rounded-lg bg-rose-100 px-6 py-5"
      {...props}
    >
      {children}
    </div>
  );
};

Error.propTypes = {
  children: PropTypes.node,
};

export default Error;
