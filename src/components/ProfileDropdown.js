import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import Dropdown from "./Dropdown";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Dropdown
      options={[
        () => (
          <NavLink
            className="w-full whitespace-nowrap inline-flex justify-center text-sm font-semibold py-2.5 px-4 text-slate-700 hover:text-slate-900 border-b border-slate-900/10"
            to="/user-profile"
          >
            Your profile
          </NavLink>
        ),
        () => (
          <a
            href="/"
            onClick={() => dispatch(logout())}
            className="w-full whitespace-nowrap inline-flex justify-center text-sm font-semibold py-2.5 px-4 text-slate-700 hover:text-slate-900"
          >
            Sign out
          </a>
        ),
      ]}
    >
      <div className="cursor-pointer inline-flex justify-center items-center">
        <div className="bg-slate-300 text-slate-700 rounded-full h-8 w-8 inline-flex justify-center text-sm items-center">
          {userInfo.name && userInfo.name[0].toUpperCase()}
        </div>
        <svg
          className="ml-1 h-5 w-5 text-gray-400"
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
