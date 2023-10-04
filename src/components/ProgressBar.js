import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ value = 100 }) => (
  <div className="rounded-lg bg-slate-200">
    <div
      className="ease-in duration-300 py-1 rounded-lg bg-lime-600"
      style={{ width: `${value}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  value: PropTypes.number,
};

export default ProgressBar;
