import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";
import Button from "./Button";
import ProfileDropdown from "./ProfileDropdown";

const PATHNAME_WITHOUT_HEADER = ["/login", "/register"];

const Header = () => {
  let location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (PATHNAME_WITHOUT_HEADER.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent text-sm font-semibold leading-6">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <div className="relative hidden lg:flex items-center ml-auto">
              {isFetching && (
                <span className="text-slate-600 px-5">
                  Fetching your profile...
                </span>
              )}
              {userInfo ? (
                <ProfileDropdown />
              ) : (
                <>
                  <NavLink
                    className="whitespace-nowrap inline-flex justify-center text-sm font-semibold py-2.5 px-4 text-slate-600"
                    to="/login"
                  >
                    Sign in
                  </NavLink>
                  <Button primary>
                    <NavLink to="/register">Register</NavLink>
                  </Button>
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
