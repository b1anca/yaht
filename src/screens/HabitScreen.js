import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { H1 } from "../components/Typography";
import { selectHabitById } from "../features/habits/habitSelectors";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <H1>{habit.name}</H1>
      </div>
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
