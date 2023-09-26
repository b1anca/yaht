import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink as RRDNavLink } from "react-router-dom";
import { COLORS } from "../constants";

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
        "text-sm whitespace-nowrap py-2 px-6 justify-center font-extrabold py-2.5 px-4",
        {
          "ring-1 ring-slate-300/10 hover:ring-slate-200/20": secondary,
          "w-full text-zinc-100 rounded-full opacity-90 hover:opacity-100":
            primary,
          "text-zinc-600": tetriary,
        },
        className
      )}
      style={{ ...(primary && { backgroundColor: COLORS.green }) }}
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
