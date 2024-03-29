import React from "react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import NavLink from "./NavLink";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 border-b border-slate-900/10 dark:border-slate-100/10 text-sm font-semibold leading-6">
      <div className="max-w-6xl mx-auto">
        <div className="py-4 px-6">
          <div className="relative flex items-center">
            <div className="relative flex items-center ml-auto">
              {userInfo ? (
                <>
                  <DarkModeToggle />
                  <NavLink tetriary to="/habits">
                    Habits
                  </NavLink>
                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <NavLink tetriary to="/login">
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
      </div>
    </header>
  );
};

export default Header;
