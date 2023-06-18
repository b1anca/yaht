import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { H2, P } from "../../components/Typography";

const HabitCard = ({ id, name, overall_progress }) => (
  <NavLink to={`/habits/${id}`} className="basis-1/4">
    <div className="p-4 m-1 rounded hover:text-slate-100 bg-slate-300/5">
      <H2>{name}</H2>
      <div className="flex justify-between">
        <div className="flex-col flex-1">
          <P>Overall progress</P>
          {/* TODO: completion rate */}
          <P className="!text-4xl">{overall_progress}%</P>
        </div>
        <div className="flex-col flex-1">
          <P>Days in a row</P>
          <P bold>02</P>
          <P>Record</P>
          <P bold>02</P>
        </div>
      </div>
    </div>
  </NavLink>
);

HabitCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  overall_progress: PropTypes.string,
};

export default HabitCard;
