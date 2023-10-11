import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const ProgressBar = ({ value = 100, className = "" }) => (
  <div className={classNames("rounded-lg bg-slate-200", className)}>
    <div
      className="ease-in duration-300 py-1 rounded-lg bg-lime-600"
      style={{ width: `${value}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressBar;
