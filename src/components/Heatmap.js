import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { format, isToday, subYears, startOfWeek } from "date-fns";
import {
  WEEKDAY_NAMES,
  getDaysBetweenDates,
  getMonthsBetweenDates,
} from "../utils/dateHelpers";
import { COLORS } from "../constants";
import { P } from "./Typography";

const AVAILABLE_COLORS = [
  COLORS.blue600,
  COLORS.blue500,
  COLORS.blue400,
  COLORS.blue300,
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

const Heatmap = ({ data, oneColor = false }) => {
  const getColor = useColorForTasks(data, AVAILABLE_COLORS);
  const endDate = new Date();
  const startDate = startOfWeek(subYears(new Date(), 1));
  const length = getDaysBetweenDates(startDate, endDate) + 1;
  const months = getMonthsBetweenDates(startDate, endDate);

  return (
    <>
      <div className="flex ml-9 justify-around">
        {months.map((monthName, index) => (
          <P semibold key={`${monthName}-${index}`}>
            {monthName}
          </P>
        ))}
      </div>
      <div className="flex">
        <div className="grid grid-rows-7 items-center">
          {WEEKDAY_NAMES.map((dayName) => (
            <P semibold key={dayName} className="text-center !mb-0 mr-2">
              {["Mon", "Wed", "Fri"].includes(dayName) ? dayName : ""}
            </P>
          ))}
        </div>

        <div className="grid grid-cols-53 gap-0.5 w-full">
          {Array.from({ length }, (_, day) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day);

            const isCurrentDate = isToday(date);
            const tasks = data[date.toLocaleDateString()];
            const title = `${tasks || "no"} tasks completed - ${format(
              date,
              "EEE"
            )}, ${format(date, "MMMM dd, yyyy")}`;
            const rowStart = (day % 7) + 1;

            return (
              <div
                key={title}
                title={title}
                className={classNames(
                  "h-4 border rounded-sm dark:border-zinc-800",
                  {
                    "border-zinc-400": isCurrentDate,
                    "bg-slate-200 dark:!bg-[#24292E]": !tasks,
                  }
                )}
                style={{
                  ...(tasks && {
                    backgroundColor: oneColor
                      ? COLORS.blue500
                      : getColor(tasks),
                  }),
                  gridRowStart: rowStart,
                  gridRowEnd: rowStart + 1,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

Heatmap.propTypes = {
  data: PropTypes.object.isRequired,
  oneColor: PropTypes.bool,
};

export default Heatmap;
