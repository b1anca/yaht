import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "./Spinner";
import { COLORS } from "../constants";

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
        "opacity-90 hover:opacity-100 text-sm button py-2 px-6 rounded-full inline-flex justify-center text-sm font-semibold py-2.5 px-4",
        {
          "text-zinc-100 ring-1 ring-slate-900/10 hover:ring-slate-900/20":
            !primary,
          "text-zinc-100 hover:bg-slate-200": primary,
        },
        className
      )}
      style={{ ...(primary && { backgroundColor: COLORS.green }) }}
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
