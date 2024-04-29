import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BG_COLORS } from "../constants";

const ProgressBar = ({ value = 100, className = "", color = "" }) => (
  <div className={classNames(`rounded-lg ${BG_COLORS.secondary}`, className)}>
    <div
      className={`ease-in duration-300 py-1 rounded-lg ${BG_COLORS.primary}`}
      style={{ width: `${value}%`, backgroundColor: color }}
    />
  </div>
);

ProgressBar.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default ProgressBar;
