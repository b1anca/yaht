import React from "react";
import PropTypes from "prop-types";

export const H1 = ({ children, ...props }) => {
  return (
    <h1
      className="mb-4 text-4xl font-extrabold tracking-tight text-slate-700"
      {...props}
    >
      {children}
    </h1>
  );
};

export const P = ({ children, ...props }) => {
  return (
    <p className="text-sm mb-2 tracking-tight text-slate-600" {...props}>
      {children}
    </p>
  );
};

H1.propTypes = {
  children: PropTypes.node,
};

P.propTypes = {
  children: PropTypes.node,
};
