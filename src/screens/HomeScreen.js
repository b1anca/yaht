import React from "react";
import Header from "../components/Header";
import { COLORS } from "../constants";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="relative mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-32">
        <h1
          className="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight sm:text-7xl xl:max-w-[43.5rem]"
          style={{ color: COLORS.green }}
        >
          Yet Another Habits Tracker
        </h1>
      </div>
    </>
  );
};

export default HomeScreen;
