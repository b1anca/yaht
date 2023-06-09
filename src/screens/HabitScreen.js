import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { H1, P } from "../components/Typography";
import NavLink from "../components/NavLink";
import { selectHabitById } from "../features/habits/habitSelectors";
import HabitHeatmap from "../components/HabitHeatmap";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));
  const tasksSet = new Set(
    habit.tasks.map((t) => new Date(t.completed_at).toISOString())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <H1 className="!mb-0">{habit.name}</H1>
          <P>{habit.description}</P>
        </div>
        <NavLink to={`/habits/${id}/edit`} className="!text-xl" tetriary>
          <FontAwesomeIcon icon={faEdit} />
        </NavLink>
      </div>
      <div>
        <HabitHeatmap dataSet={tasksSet} habitColor={habit.color} />
      </div>
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
