import React from "react";
import NavLink from "../components/NavLink";

const HomeScreen = () => {
  return (
    <div className="relative mx-auto w-full max-w-container px-4 pt-12 sm:px-6 sm:pt-16 lg:flex lg:justify-between lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-[40rem] lg:mx-0 lg:max-w-none lg:flex-none">
        <ul className="space-y-10 text-sm leading-6 text-slate-700 lg:sticky lg:top-0 lg:-mt-16 lg:h-screen lg:w-72 lg:overflow-y-auto lg:py-16 lg:pr-8 lg:[mask-image:linear-gradient(to_bottom,transparent,white_4rem,white)]">
          <li>
            <NavLink to="/habits">Your habits</NavLink>
          </li>
        </ul>
      </div>
      <div className="mx-auto mt-20 min-w-0 max-w-[40rem] lg:ml-16 lg:mr-0 lg:mt-0 lg:max-w-[50rem] lg:flex-auto prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
        <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
          Dashboard
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
