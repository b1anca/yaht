import React from "react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import NavLink from "./NavLink";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="top-0 z-40 w-full backdrop-blur transition-colors duration-500 border-b border-slate-900/10 dark:border-slate-100/10 text-sm font-semibold leading-6">
      <div className="py-4 px-6">
        <div className="relative flex items-center">
          <NavLink tertiary to="/" className="pl-0">
            YAHT
          </NavLink>
          <div className="relative flex items-center ml-auto">
            {userInfo ? (
              <>
                <DarkModeToggle />
                <NavLink tertiary to="/habits">
                  Habits
                </NavLink>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <NavLink tertiary to="/login">
                  Sign in
                </NavLink>
                <NavLink primary to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
