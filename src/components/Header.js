import React from "react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";
import NavLink from "./NavLink";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-slate-900/10 text-sm font-semibold leading-6 bg-slate-300/5">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 mx-4">
          <div className="relative flex items-center">
            <div className="relative hidden lg:flex items-center ml-auto">
              {userInfo ? (
                <ProfileDropdown />
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
