import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NavLink from "../components/NavLink";
import { fetchHabits } from "../features/habits/habitActions";
import { H1, H2, P } from "../components/Typography";
import { COLORS } from "../constants";

const HabitsScreen = () => {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <H1>Your habits</H1>
        <NavLink className="!w-min h-min" primary to="/habits/new">
          Create habit
        </NavLink>
      </div>
      {habits.map((habit) => (
        <div
          className="w-full p-4 mr-2 mb-2 rounded-lg bg-gradient-to-br from-purple-400 to-slate-100"
          key={habit.id}
        >
          <div className="flex justify-between">
            <div className="p-2">
              <H2 className="!mb-0">{habit.name}</H2>
            </div>
            <div>
              <NavLink to={`/habits/${habit.id}/edit`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="lg"
                  style={{ color: COLORS.slate700 }}
                />
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

HabitsScreen.displayName = "HabitsScreen";

export default HabitsScreen;
