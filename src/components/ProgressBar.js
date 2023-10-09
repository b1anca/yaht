import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const ProgressBar = ({ value = 100, className = "" }) => (
  <div className="rounded-lg bg-slate-200">
    <div
      className={classNames(
        "ease-in duration-300 py-1 rounded-lg bg-lime-600",
        className
      )}
      style={{ width: `${value}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressBar;
