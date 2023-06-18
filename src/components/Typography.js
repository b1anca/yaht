import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TEXT_CLASS = {
  h1: "text-4xl",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
};

export const Heading = ({ level = "h1", children, className, ...rest }) => {
  const Element = level;
  const textClass = TEXT_CLASS[level];

  return (
    <Element
      level="h4"
      className={classNames(
        "mb-4 font-extrabold tracking-tight",
        textClass,
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  );
};

export const H1 = ({ children, className, ...rest }) => {
  return (
    <h1
      className={classNames(
        "mb-4 text-4xl font-extrabold tracking-tight",
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
        "mb-4 text-2xl font-extrabold tracking-tight",
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
        "text-sm mb-2 tracking-tight",
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

Heading.propTypes = {
  level: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
};
