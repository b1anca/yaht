import React, { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import HabitRow from "./HabitRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../constants";
import {
  getWeekName,
  areDatesEqual,
  createWeekRange,
} from "../../utils/dateHelpers";
import { Heading, P } from "../../components/Typography";
import ProgressBar from "../../components/ProgressBar";

const DayHeader = ({ day }) => {
  const isCurrentDate = areDatesEqual(day, new Date());

  return (
    <P
      bold
      className={classNames("!mb-0 p-1 text-center rounded-lg border", {
        "border-zinc-100 dark:border-zinc-800": !isCurrentDate,
        "border-zinc-400 dark:border-zinc-200": isCurrentDate,
      })}
    >
      {day.getDate()} <br />
      {getWeekName(day)}
    </P>
  );
};

const WeekHabits = ({ habits, data }) => {
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    setDateRange(createWeekRange(new Date()));
  }, []);

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

  const comparedToLastWeek = () => {
    const percentageChange = (
      lastWeekSum === 0
        ? 0
        : ((currentWeekSum - lastWeekSum) / lastWeekSum) * 100
    ).toFixed(2);

    let displayMessage, icon;
    if (percentageChange > 0) {
      displayMessage = `Up ${percentageChange}% from last week`;
      icon = faArrowUp;
    } else if (percentageChange < 0) {
      displayMessage = `Down ${Math.abs(percentageChange)}% from last week`;
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
              color: percentageChange > 0 ? COLORS.lime500 : COLORS.red500,
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
    <>
      <ProgressBar value={completedWeekPercentage} className="mb-1" />
      <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center">{comparedToLastWeek()}</div>
        <P bold className="!mb-0">
          {completedWeekPercentage.toFixed(2)}% achieved
        </P>
      </div>
      <div className="flex items-center mt-6 mb-2">
        <div
          onClick={onClickLeft}
          className="border dark:border-zinc-200 rounded-full px-3 py-1 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 mr-4"
        >
          <FontAwesomeIcon
            size="sm"
            icon={faChevronLeft}
            className="dark:text-zinc-300 text-zinc-600"
          />
        </div>
        <div
          onClick={onClickRight}
          className="border dark:border-zinc-200 rounded-full px-3 py-1 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 mr-4"
        >
          <FontAwesomeIcon
            size="sm"
            icon={faChevronRight}
            className="dark:text-zinc-300 text-zinc-600"
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
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "minmax(auto, 300px) repeat(10, 1fr)" }}
      >
        <div />
        {dateRange.map((day) => (
          <DayHeader key={day.toISOString()} day={day} />
        ))}
        <P bold className="!mb-0 p-1 text-center">
          current <br />
          streak
        </P>
        <P bold className="!mb-0 p-1 text-center">
          longest <br />
          streak
        </P>
        <P bold className="!mb-0 p-1 text-center">
          overall <br />
          progress
        </P>
        {habits.map((habit) => (
          <HabitRow key={habit.id} {...habit} days={dateRange} />
        ))}
      </div>
    </>
  );
};

DayHeader.propTypes = {
  day: PropTypes.object,
};

WeekHabits.propTypes = {
  habits: PropTypes.array,
  data: PropTypes.object,
};

export default WeekHabits;
