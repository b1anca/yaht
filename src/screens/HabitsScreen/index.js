import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Heading, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import {
  createDateRange,
  getWeekName,
  getMonthName,
  areDatesEqual,
} from "../../utils/dateHelpers";
import HabitRow from "./HabitRow";
import NavLink from "../../components/NavLink";
import Heatmap from "../../components/Heatmap";

const ProgressBar = ({ value = 100 }) => (
  <div className="rounded-lg bg-slate-200">
    <div
      className="ease-in duration-300 py-1 rounded-lg bg-lime-600"
      style={{ width: `${value}%` }}
    />
  </div>
);

const DayHeader = ({ day }) => {
  const isCurrentDate = areDatesEqual(day, new Date());

  return (
    <th title={day.toDateString()}>
      <div
        className={classNames("rounded-lg py-1 mb-2", {
          "border border-slate-900/10": isCurrentDate,
        })}
      >
        <P className="!mb-0">{day.getDate()}</P>
        <P className="!mb-0">{getWeekName(day)}</P>
      </div>
    </th>
  );
};

// TODO:
// - error tracking, monitoring for the react app
// - tests for the other components (meet coverage threshold)
// - show formatted date (with weekday) on tracker hover
// - delete habit
// - notes for habits
// - loading state when loading habist (habits screen)
// - allow changing month (habits screen)
// - allow changing year (habit screen)

function getBeginningOfWeek(date) {
  const day = date.getDay() || 7;
  const diff = date.getDate() - day + 1;
  return new Date(date.setDate(diff));
}

function getEndOfWeek(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + 7;
  return new Date(date.setDate(diff));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const HabitsScreen = () => {
  const [dateRange, setDateRange] = useState([]);
  const { habits } = useSelector((state) => state.habits);
  const { userInfo } = useSelector((state) => state.auth);
  const currentDate = new Date();

  const completedCount = habits.reduce((sum, habit) => {
    if (
      habit.tasks.some((t) =>
        areDatesEqual(new Date(t.completed_at), new Date())
      )
    ) {
      sum += 1;
    }
    return sum;
  }, 0);

  const habitsPercentage = !habits.length
    ? 0
    : (completedCount / habits.length) * 100;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
    setDateRange(
      createDateRange(
        getBeginningOfWeek(currentDate),
        getEndOfWeek(currentDate)
      )
    );
  }, []);

  const data = habits.reduce((h, habit) => {
    habit.tasks.forEach((t) => {
      const date = new Date(t.completed_at).toLocaleDateString();
      if (h[date]) {
        h[date] += 1;
      } else {
        h[date] = 1;
      }
    });
    return h;
  }, {});

  return (
    <div>
      <Heading level="h1">
        Hello, {userInfo && capitalizeFirstLetter(userInfo.name)}
      </Heading>
      <div className="flex justify-between items-center mb-4">
        <Heading level="h2" className="!mb-0">
          {`Today, ${getMonthName(
            currentDate
          )} ${currentDate.getDate()} ${getWeekName(currentDate)}`}
        </Heading>
        <NavLink className="!w-min h-min" primary to="/habits/new">
          Add habit
        </NavLink>
      </div>
      <ProgressBar value={habitsPercentage} />
      <P bold className="mt-1 text-lime-600">
        {habitsPercentage}% completed
      </P>
      <table className="table-fixed">
        <thead>
          <tr>
            <div />
            {dateRange.map((day) => (
              <DayHeader key={day.toISOString()} day={day} />
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <HabitRow key={habit.id} {...habit} days={dateRange} />
          ))}
        </tbody>
      </table>
      <div className="border-b border-slate-900/10 my-6" />
      {/* <div className="flex justify-between items-center mt-12 mb-4">
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
      <Heading level="h2" className="mt-12">
        Contributions
      </Heading>
      */}
      <Heatmap data={data} />
    </div>
  );
};

DayHeader.propTypes = {
  day: PropTypes.object,
};

ProgressBar.propTypes = {
  value: PropTypes.number,
};

export default HabitsScreen;
