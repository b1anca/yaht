import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { P, Heading } from "../../components/Typography";
import ProgressChart from "./ProgressChart";

const HabitCard = ({ id, name, overall_progress, color }) => (
  <NavLink
    to={`/habits/${id}`}
    className="w-full max-w-[100%] lg:basis-1/4 lg:max-w-[25%]"
  >
    <div className="p-4 m-1 rounded hover:text-slate-100 bg-slate-300/5">
      <Heading level="h3" className="truncate">
        {name}
      </Heading>
      <div className="flex justify-between">
        <div className="flex-col flex-1">
          {/* TODO: completion rate */}
          <ProgressChart value={Number(overall_progress)} color={color} />
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
  color: PropTypes.string,
  overall_progress: PropTypes.string,
};

export default HabitCard;
