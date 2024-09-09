import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Dropdown from "./Dropdown";
import { BG_COLORS } from "../constants";
import NavLink from "./NavLink";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Dropdown
      options={[
        () => (
          <NavLink
            tertiary
            to="/user-profile"
            className="inline-flex justify-center"
          >
            Your profile
          </NavLink>
        ),
        () => (
          <NavLink
            tertiary
            href="/"
            onClick={() => dispatch(logout())}
            className="inline-flex justify-center"
          >
            Sign out
          </NavLink>
        ),
      ]}
    >
      <div className="cursor-pointer inline-flex justify-center items-center">
        <div
          className={`shadow ${BG_COLORS.primary} text-zinc-100/90 rounded-full h-8 w-8 inline-flex justify-center text-sm items-center`}
        >
          {userInfo.name && userInfo.name[0].toUpperCase()}
        </div>
        <svg
          className="ml-1 h-5 w-5 dark:text-zinc-200"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
