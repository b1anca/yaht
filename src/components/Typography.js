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
        "mb-4 font-extrabold tracking-tight dark:text-zinc-200",
        textClass,
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  );
};

export const P = ({ children, className, bold, ...rest }) => {
  return (
    <p
      className={classNames(
        "text-sm mb-2 tracking-tight text-zinc-600 dark:text-zinc-200",
        { "font-extrabold": bold },
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
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
