import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { monthNames, getDaysInMonth, formatDate } from "../utils/dateHelpers";
import { COLORS } from "../constants";

const MAX_COLUMNS = 32;

const AVAILABLE_COLORS = [
  COLORS.slate600,
  COLORS.slate500,
  COLORS.slate400,
  COLORS.slate300,
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

  return (
    <div className="flex flex-wrap">
      {monthNames.map((_, monthIndex) => {
        const days = getDaysInMonth(monthIndex, 2023);

        return (
          <>
            {Array.from({ length: MAX_COLUMNS - 1 }, (_, index) => {
              const currentDate = new Date(2023, monthIndex, index + 1);
              const tasks = data[currentDate.toLocaleDateString()];
              const title = `${tasks || "no"} tasks completed - ${formatDate(
                currentDate
              )}`;

              if (index < days.length) {
                return (
                  <div
                    key={index}
                    title={title}
                    className="rounded w-6 h-6 border border-slate-500 hover:border-slate-200 mb-1 mr-1"
                    style={{
                      backgroundColor: tasks ? getColor(tasks) : "unset",
                    }}
                  />
                );
              }
            })}
          </>
        );
      })}
    </div>
  );
};

Heatmap.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Heatmap;
