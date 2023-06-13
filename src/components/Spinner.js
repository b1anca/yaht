import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Spinner = ({ className }) => {
  return (
    <div
      className={classNames(
        "inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-r-transparent",
        className
      )}
      role="status"
    />
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
