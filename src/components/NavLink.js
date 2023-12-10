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
        "text-sm whitespace-nowrap py-2 px-6 justify-center font-extrabold py-2.5 px-4",
        {
          "ring-1 ring-slate-300/10 dark:ring-zinc-200 dark:text-zinc-200 hover:ring-slate-200/20 shadow rounded-full":
            secondary,
          "w-full shadow text-zinc-100 rounded-full bg-sky-600 hover:bg-sky-700":
            primary,
          "dark:text-zinc-200 text-zinc-600 hover:text-sky-600 dark:hover:text-sky-600":
            tetriary,
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
