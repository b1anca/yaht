import React from "react";
import PropTypes from "prop-types";
import { P } from "./Typography";
import { monthNames, getDaysInMonth, formatDate } from "../utils/dateHelpers";
import { DEFAULT_HABIT_COLOR } from "../constants";

const MAX_COLUMNS = 32;

const HabitYearView = ({ dataSet, habitColor }) => {
  return (
    <>
      {monthNames.map((month, monthIndex) => {
        const days = getDaysInMonth(monthIndex, 2023);

        return (
          <div key={month} className="flex mb-1 items-center">
            <P
              bold
              className="whitespace-nowrap font-semibold mt-2 mr-2 min-w-[25px]"
            >
              {month}
            </P>
            <div className="flex flex-wrap">
              {Array.from({ length: MAX_COLUMNS - 1 }, (_, index) => {
                const currentDate = new Date(2023, monthIndex, index + 1);

                if (index < days.length) {
                  return (
                    <div
                      key={index}
                      title={formatDate(currentDate)}
                      className="rounded w-6 h-6 border border-slate-500 hover:border-slate-200 mb-1 mr-1"
                      style={{
                        backgroundColor: dataSet.has(
                          currentDate.toLocaleDateString()
                        )
                          ? habitColor || DEFAULT_HABIT_COLOR
                          : "unset",
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

HabitYearView.propTypes = {
  dataSet: PropTypes.instanceOf(Set).isRequired,
  habitColor: PropTypes.string,
};

export default HabitYearView;
