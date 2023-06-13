import React from "react";
import NavLink from "./NavLink";

const Sidenav = () => (
  <div className="mx-auto max-w-[30rem] lg:mx-0 lg:max-w-none lg:flex-none">
    <div className="text-sm flex flex-col items-start leading-6 lg:sticky lg:top-0 lg:-mt-16 lg:h-screen lg:w-72 lg:overflow-y-auto lg:py-16 lg:pr-8 lg:[mask-image:linear-gradient(to_bottom,transparent,white_4rem,white)]">
      <NavLink tetriary to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink tetriary to="/habits">
        Your habits
      </NavLink>
    </div>
  </div>
);

Sidenav.displayName = "Sidenav";

export default Sidenav;
