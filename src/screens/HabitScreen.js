import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { H1 } from "../components/Typography";
import NavLink from "../components/NavLink";
import { selectHabitById } from "../features/habits/habitSelectors";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <H1>{habit.name}</H1>
        <NavLink to={`/habits/${id}/edit`} className="!text-xl" tetriary>
          <FontAwesomeIcon icon={faEdit} />
        </NavLink>
        {/* TODO: heatmap */}
      </div>
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
