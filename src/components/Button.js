import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "./Spinner";
import { BUTTON_STYLES } from "../constants";

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
        BUTTON_STYLES.base,
        {
          [BUTTON_STYLES.secondary]: !primary,
          [BUTTON_STYLES.primary]: primary,
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
