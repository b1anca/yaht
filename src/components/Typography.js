import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const H1 = ({ children, className, ...rest }) => {
  return (
    <h1
      className={classNames(
        "mb-4 text-4xl font-extrabold tracking-tight text-slate-700",
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const P = ({ children, className, ...rest }) => {
  return (
    <p
      className={classNames(
        "text-sm mb-2 tracking-tight text-slate-600",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
