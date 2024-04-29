import React, { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { format, isSameDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { COLORS, TEXT_COLORS } from "../../constants";
import HabitRow from "./HabitRow";
import { getWeeklyDateRange, getDaysInMonth } from "../../utils/dateHelpers";
import { Heading, P } from "../../components/Typography";
import ProgressBar from "../../components/ProgressBar";

const DayHeader = ({ day }) => {
  const isCurrentDate = isSameDay(day, new Date());

  return (
    <div className="grow">
      <P
        className={classNames("!mb-0 p-1 text-center", {
          [TEXT_COLORS.secondary]: !isCurrentDate,
          "font-bold": isCurrentDate,
        })}
      >
        {day.getDate()} <br />
        {format(day, "EEE")}
      </P>
    </div>
  );
};

const WeeklyTracker = ({ habits, data }) => {
  const [dateRange, setDateRange] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    setDateRange(getDaysInMonth(currentDate));
  }, []);

  // const onClickLeft = () => {
  //   const date = dateRange[0];
  //   date.setDate(date.getDate() - 1);
  //   setDateRange(getWeeklyDateRange(date));
  // };

  // const onClickRight = () => {
  //   const date = dateRange[6];
  //   date.setDate(date.getDate() + 1);
  //   setDateRange(getWeeklyDateRange(date));
  // };

  // const lastWeekSum = useMemo(() => {
  //   const startDate = new Date(dateRange[0]);

  //   return Array.from({ length: 7 }).reduce((sum, _, i) => {
  //     const date = new Date(startDate);
  //     date.setDate(startDate.getDate() - i - 1);
  //     return sum + (data[date.toLocaleDateString()] || 0);
  //   }, 0);
  // }, [habits, dateRange]);

  // const currentWeekSum = useMemo(() => {
  //   const startDate = new Date(dateRange[0]);

  //   return Array.from({ length: 7 }).reduce((sum, _, i) => {
  //     const date = new Date(startDate);
  //     date.setDate(startDate.getDate() + i);
  //     return sum + (data[date.toLocaleDateString()] || 0);
  //   }, 0);
  // }, [habits, dateRange]);

  // const completedWeekPercentage = habits.length
  //   ? (currentWeekSum / (habits.length * 7)) * 100
  //   : 0;

  // const comparedToLastWeek = () => {
  //   const percentageChange = (
  //     lastWeekSum === 0
  //       ? 0
  //       : ((currentWeekSum - lastWeekSum) / lastWeekSum) * 100
  //   ).toFixed(2);

  //   let displayMessage, icon;
  //   if (percentageChange > 0) {
  //     displayMessage = `Up ${percentageChange}% from last week`;
  //     icon = faArrowUp;
  //   } else if (percentageChange < 0) {
  //     displayMessage = `Down ${Math.abs(percentageChange)}% from last week`;
  //     icon = faArrowDown;
  //   } else {
  //     displayMessage = "No change from last week";
  //   }

  //   return (
  //     <>
  //       {icon && (
  //         <FontAwesomeIcon
  //           icon={icon}
  //           style={{
  //             color: percentageChange > 0 ? COLORS.lime500 : COLORS.red500,
  //           }}
  //         />
  //       )}
  //       <P semibold className="!mb-0 ml-1">
  //         {displayMessage}
  //       </P>
  //     </>
  //   );
  // };

  return (
    <div className="border border-slate-900/10 dark:border-slate-100/10 p-3 rounded-sm mb-4">
      {/* <div className="flex items-center mt-6 mb-2">
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
          {dateRange[0] && format(dateRange[0], "EEE MM/dd")} -{" "}
          {dateRange[6] && format(dateRange[6], "EEE MM/dd")}
        </Heading>
      </div>
      <ProgressBar value={completedWeekPercentage} className="mb-1" /> */}
      {/* <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center">{comparedToLastWeek()}</div>
        <P semibold className="!mb-0">
          {completedWeekPercentage.toFixed(2)}% achieved
        </P>
      </div> */}
      {habits.length > 0 ? (
        <div>
          <div className="flex mb-2">
            <div className="w-[200px]" />
            {dateRange.map((day) => (
              <DayHeader key={day.toISOString()} day={day} />
            ))}
            {/* <P className="!mb-0 p-1 text-center font-semibold">
              current <br />
              streak
            </P>
            <P className="!mb-0 p-1 text-center font-semibold">
              longest <br />
              streak
            </P>
            <P className="!mb-0 p-1 text-center font-semibold">
              overall <br />
              progress
            </P> */}
          </div>
          {habits.map((habit) => (
            <HabitRow key={habit.id} {...habit} days={dateRange} />
          ))}
        </div>
      ) : (
        <P>
          Looks like you&apos;re just getting started! Click on the &apos;Add
          Habit&apos; button to begin your journey towards positive change.
          Let&apos;s create your first habit today!
        </P>
      )}
    </div>
  );
};

DayHeader.propTypes = {
  day: PropTypes.object,
};

WeeklyTracker.propTypes = {
  habits: PropTypes.array,
  data: PropTypes.object,
};

export default WeeklyTracker;
