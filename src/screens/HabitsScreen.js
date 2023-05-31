import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLink from "../components/NavLink";
import { fetchHabits } from "../features/habits/habitsActions";
import withSideNavLayout from "../hoc/withSidenavLayout";
import { H1 } from "../components/Typography";

const HabitsScreen = () => {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <>
      <H1>Your habits</H1>
      {habits.map((habit, index) => (
        <div
          key={index}
          className="text-sm text-slate-700 mb-4 rounded-lg bg-slate-100 px-6 py-5"
        >
          {habit.name}
        </div>
      ))}
      <NavLink primary to="/habits/new">
        Create habit
      </NavLink>
    </>
  );
};

HabitsScreen.displayName = "HabitsScreen";

export default withSideNavLayout(HabitsScreen);
