import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Heading, P } from "../components/Typography";
import NavLink from "../components/NavLink";
import { selectHabitById } from "../features/habits/habitSelectors";
import HabitYearView from "../components/HabitYearView";
import { fetchHabit } from "../features/habits/habitActions";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));
  const dispatch = useDispatch();

  const tasksSet = new Set(
    habit?.tasks.map((t) => new Date(t.completed_at).toLocaleDateString())
  );

  useEffect(() => {
    if (!habit) {
      dispatch(fetchHabit(id));
    }
  }, []);

  if (!habit) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <Heading level="h2" className="!mb-1">
            {habit.name}
          </Heading>
          <P>{habit.description}</P>
        </div>
        <NavLink to={`/habits/${id}/edit`} className="!text-xl" tetriary>
          <FontAwesomeIcon icon={faEdit} />
        </NavLink>
      </div>
      <div className="bg-slate-300/5 rounded p-6">
        <HabitYearView dataSet={tasksSet} habitColor={habit.color} />
      </div>
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
