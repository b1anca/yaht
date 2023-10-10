import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Heading, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import {
  getWeekName,
  getMonthName,
  areDatesEqual,
  createWeekRange,
} from "../../utils/dateHelpers";
import HabitRow from "./HabitRow";
import NavLink from "../../components/NavLink";
import Heatmap from "../../components/Heatmap";
import ProgressBar from "../../components/ProgressBar";
import { COLORS } from "../../constants";

const DayHeader = ({ day }) => {
  const isCurrentDate = areDatesEqual(day, new Date());

  return (
    <th title={day.toDateString()}>
      <div
        className={classNames("rounded-lg py-1 mb-2 border", {
          "border-zinc-100": !isCurrentDate,
          "border-zinc-400": isCurrentDate,
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

const HabitsScreen = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([]);
  const { habits } = useSelector((state) => state.habits);
  const currentDate = new Date();

  useEffect(() => {
    dispatch(fetchHabits());
    setDateRange(createWeekRange(currentDate));
  }, []);

  const data = useMemo(() => {
    return habits.reduce((h, habit) => {
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
  }, [habits]);

  const completedTodayCount = data[new Date().toLocaleDateString()] || 0;
  const completedTodayPercentage =
    (completedTodayCount / habits.length) * 100 || 0;

  const onClickLeft = () => {
    const date = dateRange[0];
    date.setDate(date.getDate() - 1);
    setDateRange(createWeekRange(date));
  };

  const onClickRight = () => {
    const date = dateRange[6];
    date.setDate(date.getDate() + 1);
    setDateRange(createWeekRange(date));
  };

  const lastWeekSum = useMemo(() => {
    const startDate = new Date(dateRange[0]);

    return Array.from({ length: 7 }).reduce((sum, _, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - i - 1);
      return sum + (data[date.toLocaleDateString()] || 0);
    }, 0);
  }, [habits, dateRange]);

  const currentWeekSum = useMemo(() => {
    const startDate = new Date(dateRange[0]);

    return Array.from({ length: 7 }).reduce((sum, _, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return sum + (data[date.toLocaleDateString()] || 0);
    }, 0);
  }, [habits, dateRange]);

  const completedWeekPercentage = habits.length
    ? (currentWeekSum / (habits.length * 7)) * 100
    : 0;

  const weekPercentageChange = (
    lastWeekSum === 0 ? 0 : ((currentWeekSum - lastWeekSum) / lastWeekSum) * 100
  ).toFixed(2);

  const getDisplayMessage = () => {
    let displayMessage, icon;
    if (weekPercentageChange > 0) {
      displayMessage = `Up ${weekPercentageChange}% from last week`;
      icon = faArrowUp;
    } else if (weekPercentageChange < 0) {
      displayMessage = `Down ${Math.abs(weekPercentageChange)}% from last week`;
      icon = faArrowDown;
    } else {
      displayMessage = "No change from last week";
    }

    return (
      <>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            style={{
              color: weekPercentageChange > 0 ? COLORS.lime500 : COLORS.red500,
            }}
          />
        )}
        <P bold className="!mb-0 ml-1">
          {displayMessage}
        </P>
      </>
    );
  };

  return (
    <div>
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
      <ProgressBar value={completedTodayPercentage} className="mb-1" />
      <P bold className="text-lime-600">
        {completedTodayPercentage.toFixed(2)}% achieved today
      </P>
      <div className="flex items-center mt-6 mb-2">
        <div
          onClick={onClickLeft}
          className="border rounded-full px-3 py-1 hover:cursor-pointer hover:bg-slate-100 mr-4"
        >
          <FontAwesomeIcon
            size="sm"
            icon={faChevronLeft}
            style={{ color: COLORS.zinc600 }}
          />
        </div>
        <div
          onClick={onClickRight}
          className="border rounded-full px-3 py-1 hover:cursor-pointer hover:bg-slate-100 mr-4"
        >
          <FontAwesomeIcon
            size="sm"
            icon={faChevronRight}
            style={{ color: COLORS.zinc600 }}
          />
        </div>
        <Heading level="h3" className="!mb-0">
          {dateRange[0] &&
            `${getWeekName(
              dateRange[0]
            )} ${dateRange[0].getMonth()}/${dateRange[0].getDate()}`}
          {dateRange[6] &&
            ` - ${getWeekName(
              dateRange[6]
            )} ${dateRange[6].getMonth()}/${dateRange[6].getDate()}`}
        </Heading>
      </div>
      <ProgressBar value={completedWeekPercentage} className="mb-1" />
      <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center">{getDisplayMessage()}</div>
        <P bold className="!mb-0">
          {completedWeekPercentage.toFixed(2)}% achieved
        </P>
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>
              <div />
            </th>
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

export default HabitsScreen;
