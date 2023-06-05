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

export const H2 = ({ children, className, ...rest }) => {
  return (
    <h2
      className={classNames(
        "mb-4 text-2xl font-extrabold tracking-tight text-slate-700",
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const P = ({ children, className, bold, ...rest }) => {
  return (
    <p
      className={classNames(
        "text-sm mb-2 tracking-tight text-slate-600 ",
        { "font-extrabold": bold },
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

H2.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
};
