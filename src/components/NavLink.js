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
          "text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20":
            secondary,
          "bg-slate-900 text-white hover:bg-slate-700 w-full": primary,
          "text-slate-700 hover:text-slate-500": tetriary,
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
