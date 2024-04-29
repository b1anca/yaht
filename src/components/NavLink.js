import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink as RRDNavLink } from "react-router-dom";
import { TEXT_COLORS, BG_COLORS } from "../constants";

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
        `text-base whitespace-nowrap py-2 px-4 justify-center font-extrabold py-2.5 px-4`,
        {
          [`ring-1 ring-slate-300/10 dark:ring-zinc-200 hover:ring-slate-200/20 shadow rounded-full`]:
            secondary,
          [`w-full shadow rounded-lg text-zinc-100/90 ${BG_COLORS.primary}`]:
            primary,
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
