import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "./Spinner";

const Button = ({
  type = "text",
  primary = false,
  loading = false,
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classNames(
        "button py-2 px-6 rounded-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4",
        {
          "text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20":
            !primary,
          "bg-slate-900 text-white hover:bg-slate-700 w-full": primary,
        },
        className
      )}
      disabled={loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  primary: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
