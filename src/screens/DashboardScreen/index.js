import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { H1 } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import { P } from "../../components/Typography";
import {
  getDaysInMonth,
  formatDate,
  areDatesEqual,
} from "../../utils/dateHelpers";
import HabitRow from "./HabitRow";

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
      <H1>Today, {formatDate(currentDate)}</H1>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, i) => (
              <th key={day.toISOString()}>
                <P
                  className={classNames("mb-1", {
                    "text-slate-400": !areDatesEqual(day, currentDate),
                    "text-slate-900": areDatesEqual(day, currentDate),
                  })}
                >
                  {i + 1}
                </P>
              </th>
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

export default DashboardScreen;
