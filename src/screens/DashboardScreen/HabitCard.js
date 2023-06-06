import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { H2, P } from "../../components/Typography";

const HabitCard = ({ id, name }) => (
  <NavLink
    to={`/habits/${id}`}
    className="w-64 p-4 mr-2 rounded-lg bg-gradient-to-br from-purple-400 to-slate-100 hover:"
  >
    <H2>{name}</H2>
    <div className="flex justify-between">
      <div className="flex-col flex-1">
        <P>Overall progress</P>
        <P className="!text-4xl">90%</P>
      </div>
      <div className="flex-col flex-1">
        <P>Days in a row</P>
        <P bold>02</P>
        <P>Record</P>
        <P bold>02</P>
      </div>
    </div>
  </NavLink>
);

HabitCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export default HabitCard;
