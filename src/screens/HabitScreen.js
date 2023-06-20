import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Heading, P } from "../components/Typography";
import NavLink from "../components/NavLink";
import { selectHabitById } from "../features/habits/habitSelectors";
import HabitHeatmap from "../components/HabitHeatmap";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));
  const tasksSet = new Set(
    habit.tasks.map((t) => new Date(t.completed_at).toLocaleDateString())
  );
  console.log("debug tasksSet", tasksSet);

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
      <div className="bg-slate-400/5 rounded p-6">
        <HabitHeatmap dataSet={tasksSet} habitColor={habit.color} />
      </div>
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
