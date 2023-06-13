import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const LoadingDots = ({ className }) => {
  return (
    <div className={classNames("flex gap-2", className)}>
      <div className="w-1 h-1 rounded-full animate-pulse bg-slate-500"></div>
      <div className="w-1 h-1 rounded-full animate-pulse bg-slate-500"></div>
      <div className="w-1 h-1 rounded-full animate-pulse bg-slate-500"></div>
    </div>
  );
};

LoadingDots.propTypes = {
  className: PropTypes.string,
};

export default LoadingDots;
