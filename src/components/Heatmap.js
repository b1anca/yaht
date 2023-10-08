import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  formatDate,
  areDatesEqual,
  WEEKDAY_NAMES,
  getWeekName,
  getBeginningOfWeek,
  getDaysBetweenDates,
} from "../utils/dateHelpers";
import { COLORS } from "../constants";
import { P } from "./Typography";

const AVAILABLE_COLORS = [
  COLORS.lime300,
  COLORS.lime400,
  COLORS.lime500,
  COLORS.lime600,
];

export const calculateThresholds = (data) => {
  const taskValues = Object.values(data).sort((a, b) => a - b);
  const q1 = taskValues[Math.floor(taskValues.length / 4)];
  const q3 = taskValues[Math.floor((taskValues.length * 3) / 4)];
  const median = taskValues[Math.floor(taskValues.length / 2)];
  const iqr = q3 - q1;
  const max = taskValues[taskValues.length - 1];

  // Thresholds based on the IQR and median
  const thresholds = [0, median - iqr / 2, median + iqr / 2, max];
  return thresholds;
};

export const useColorForTasks = (data, AVAILABLE_COLORS) => {
  const thresholds = useMemo(() => calculateThresholds(data), [data]);

  return (tasks) => {
    if (tasks >= thresholds[3]) return AVAILABLE_COLORS[3];
    else if (tasks >= thresholds[2]) return AVAILABLE_COLORS[2];
    else if (tasks >= thresholds[1]) return AVAILABLE_COLORS[1];
    else return AVAILABLE_COLORS[0];
  };
};

const Heatmap = ({ data }) => {
  const getColor = useColorForTasks(data, AVAILABLE_COLORS);
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000);
  const startSunDate = getBeginningOfWeek(startDate, 0);
  const length = getDaysBetweenDates(startSunDate, endDate) + 1;

  return (
    <div className="flex">
      <div className="grid grid-rows-7 items-center">
        {WEEKDAY_NAMES.map((dayName) => (
          <P bold key={dayName} className="text-center !mb-0 mr-2">
            {["Mon", "Wed", "Fri"].includes(dayName) ? dayName : ""}
          </P>
        ))}
      </div>
      <div className="grid grid-cols-54 gap-0.5 w-full">
        {Array.from({ length }, (_, day) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + day);

          const isCurrentDate = areDatesEqual(date, new Date());
          const tasks = data[date.toLocaleDateString()];
          const title = `${tasks || "no"} tasks completed - ${getWeekName(
            date
          )}, ${formatDate(date)}`;
          const rowStart = (day % 7) + 1;

          return (
            <div
              key={day}
              title={title}
              className={classNames("h-4 border", {
                "border-zinc-400": isCurrentDate,
              })}
              style={{
                backgroundColor: tasks ? getColor(tasks) : COLORS.slate200,
                gridRowStart: rowStart,
                gridRowEnd: rowStart + 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

Heatmap.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Heatmap;
