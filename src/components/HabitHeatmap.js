import React from "react";
import PropTypes from "prop-types";
import { P } from "./Typography";
import { monthNames, getDaysInMonth, formatDate } from "../utils/dateHelpers";
import { COLORS } from "../constants";

const MAX_COLUMNS = 32;

const HabitHeatmap = ({ dataSet, habitColor }) => {
  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: MAX_COLUMNS }, (_, index) => (
            <th key={index} />
          ))}
        </tr>
      </thead>
      <tbody>
        {monthNames.map((month, monthIndex) => {
          const days = getDaysInMonth(monthIndex, 2023);

          return (
            <tr key={month}>
              <td>
                <P bold className="whitespace-nowrap font-semibold mt-2 mr-2">
                  {month}
                </P>
              </td>
              {Array.from({ length: MAX_COLUMNS - 1 }, (_, index) => {
                const currentDate = new Date(2023, monthIndex, index + 1);

                return (
                  <td key={index}>
                    {index < days.length && (
                      <div
                        title={formatDate(currentDate)}
                        className="rounded w-6 h-6 bg-slate-100"
                        style={{
                          backgroundColor: dataSet.has(
                            currentDate.toISOString()
                          )
                            ? habitColor || COLORS.slate700
                            : COLORS.slate100,
                        }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

HabitHeatmap.propTypes = {
  dataSet: PropTypes.instanceOf(Set).isRequired,
  habitColor: PropTypes.string,
};

export default HabitHeatmap;
