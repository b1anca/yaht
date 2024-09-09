import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink as RRDNavLink } from "react-router-dom";
import { TEXT_COLORS, BUTTON_STYLES } from "../constants";

const NavLink = ({
  to,
  primary = false,
  secondary = false,
  tertiary = false,
  children,
  className,
  ...rest
}) => {
  return (
    <RRDNavLink
      to={to}
      className={classNames(
        BUTTON_STYLES.base,
        {
          [BUTTON_STYLES.primary]: primary,
          [BUTTON_STYLES.secondary]: secondary,
          [`${TEXT_COLORS.base} hover:underline`]: tertiary,
        },
        className
      )}
      {...rest}
    >
      {children}
    </RRDNavLink>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NavLink;
