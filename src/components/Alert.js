import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Alert = ({ children, type = "error", className, ...props }) => {
  return (
    <div
      role="alert"
      className={classNames(
        "text-sm mb-4 rounded-lg px-6 py-5 text-slate-800",
        {
          "bg-rose-100/70": type == "error",
          "bg-yellow-100/70": type == "warning",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Alert;
