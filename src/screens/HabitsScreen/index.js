import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Heading, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import {
  areDatesEqual,
  createDateRange,
  monthNames,
} from "../../utils/dateHelpers";
import HabitRow from "./HabitRow";
import HabitCard from "./HabitCard";
import NavLink from "../../components/NavLink";
import { getRangeFromViewportWidth } from "../../utils";

const RANGE = getRangeFromViewportWidth();

const currentDate = new Date();

const start = new Date();
start.setDate(currentDate.getDate() - RANGE * 2);
const end = new Date();
end.setDate(currentDate.getDate() + RANGE / 2);

export const DATE_RANGE = createDateRange(start, end);

const DayHeader = ({ day }) => {
  const currentDate = new Date();
  return (
    <th title={day.toDateString()}>
      <P
        className={classNames({
          "text-slate-400 font-normal": !areDatesEqual(day, currentDate),
          "text-slate-200 text-base !mb-0": areDatesEqual(day, currentDate),
        })}
      >
        {day.getDate()}
      </P>
      {areDatesEqual(day, currentDate) && (
        <P className="text-slate-200">{monthNames[day.getMonth()]}</P>
      )}
    </th>
  );
};

// TODO:
// - mobile views
// - error tracking, monitoring for the react app
// - tests for the other components (meet coverage threshold)
// - show formatted date (with weekday) on tracker hover
// - delete habit
// - notes for habits
// - loading state when loading habist (habits screen)
// - allow changing month (habits screen)
// - allow changing year (habit screen)
const HabitsScreen = () => {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <div>
      <Heading level="h2">Habits tracker</Heading>
      <div className="bg-slate-300/5 rounded p-6">
        <table className="table-fixed">
          <thead>
            <tr>
              <th />
              {DATE_RANGE.map((day) => (
                <DayHeader key={day.toISOString()} day={day} />
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <HabitRow key={habit.id} {...habit} days={DATE_RANGE} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-12 mb-4">
        <Heading level="h2" className="!mb-0">
          Your habits
        </Heading>
        <NavLink className="!w-min h-min" primary to="/habits/new">
          Create habit
        </NavLink>
      </div>
      <div className="flex flex-wrap">
        {habits.map((habit) => (
          <HabitCard key={habit.id} {...habit} />
        ))}
      </div>
    </div>
  );
};

DayHeader.propTypes = {
  day: PropTypes.object,
};

export default HabitsScreen;
