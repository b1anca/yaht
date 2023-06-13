import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink as RRDNavLink } from "react-router-dom";

const NavLink = ({
  to,
  primary = false,
  secondary = false,
  tetriary = false,
  children,
  className,
  ...rest
}) => {
  return (
    <RRDNavLink
      to={to}
      className={classNames(
        "text-sm whitespace-nowrap py-2 px-6 rounded-full inline-flex justify-center rounded-lg font-semibold py-2.5 px-4",
        {
          "ring-1 ring-slate-300/10 hover:ring-slate-200/20": secondary,
          "bg-slate-300 text-slate-900 hover:bg-slate-200 w-full": primary,
          "hover:text-slate-200": tetriary,
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
  tetriary: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NavLink;
