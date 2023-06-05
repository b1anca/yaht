import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { H1, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import {
  getDaysInMonth,
  areDatesEqual,
  monthNames,
} from "../../utils/dateHelpers";
import HabitRow from "./HabitRow";
import HabitCard from "./HabitCard";

const DayHeader = ({ day, currentDate }) => (
  <th>
    <P
      className={classNames({
        "text-slate-400 mb-1 font-medium": !areDatesEqual(day, currentDate),
        "text-slate-700 text-base mb-0": areDatesEqual(day, currentDate),
      })}
    >
      {day.getDate()}
    </P>
    {areDatesEqual(day, currentDate) && (
      <P className="text-slate-700">{monthNames[day.getMonth()]}</P>
    )}
  </th>
);

const DashboardScreen = () => {
  const currentDate = new Date();
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const days = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <div>
      <H1>Habits</H1>
      <div className="flex flex-wrap mb-8">
        {habits.map((habit) => (
          <HabitCard key={habit.id} {...habit} />
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th />
            {days.map((day) => (
              <DayHeader
                key={day.toISOString()}
                day={day}
                currentDate={currentDate}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <HabitRow key={habit.id} {...habit} days={days} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

DayHeader.propTypes = {
  day: PropTypes.object,
  currentDate: PropTypes.object,
};

export default DashboardScreen;
