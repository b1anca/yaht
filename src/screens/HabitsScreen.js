import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavLink from "../components/NavLink";
import { fetchHabits } from "../features/habits/habitActions";
import { H1 } from "../components/Typography";
import Table from "../components/Table";

const HabitsScreen = () => {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const habitsData = habits.map((h) => ({
    Id: h.id,
    Name: h.name,
    "Overal progress": "50%",
    "Days in a row": 2,
    Record: 2,
    Color: h.color,
    "Created at": h.created_at,
  }));

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
      {habitsData.length && (
        <Table
          data={habitsData}
          onRowClick={({ Id }) => navigate(`/habits/${Id}`)}
        />
      )}
    </>
  );
};

HabitsScreen.displayName = "HabitsScreen";

export default HabitsScreen;
