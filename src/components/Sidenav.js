import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";

const Sidenav = () => (
  <div className="mx-auto max-w-[16rem] lg:mx-0 lg:max-w-none lg:flex-none bg-slate-300/5">
    <div className="text-sm flex flex-col items-start lg:sticky lg:top-0 lg:-mt-16 lg:h-screen lg:w-72 lg:overflow-y-auto lg:p-6 lg:pr-8">
      <NavLink tetriary to="/" className="pl-0">
        YAHT
      </NavLink>
      <NavLink tetriary to="/habits" className="pl-0 mt-6">
        <FontAwesomeIcon icon={faBarsProgress} size="xl" className="mr-6" />
        Habits
      </NavLink>
    </div>
  </div>
);

Sidenav.displayName = "Sidenav";

export default Sidenav;
