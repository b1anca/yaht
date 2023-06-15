import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";
import ProfileDropdown from "./ProfileDropdown";
import NavLink from "./NavLink";
import LoadingDots from "./LoadingDots";

const PATHNAMES_WITHOUT_HEADER = ["/login", "/register"];

const Header = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (PATHNAMES_WITHOUT_HEADER.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-slate-900/10 text-sm font-semibold leading-6">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 mx-4">
          <div className="relative flex items-center">
            <div className="relative hidden lg:flex items-center ml-auto">
              {isFetching && <LoadingDots />}
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
