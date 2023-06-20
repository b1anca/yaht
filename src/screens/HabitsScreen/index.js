import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { H2, P } from "../../components/Typography";
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

const HabitsScreen = () => {
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
      <H2>Habits tracker</H2>
      <div className="bg-slate-400/5 rounded p-6">
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
      <H2 className="mt-16">Your habits</H2>
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
  currentDate: PropTypes.object,
};

export default HabitsScreen;
