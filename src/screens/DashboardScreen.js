import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import withSideNavLayout from "../hoc/withSidenavLayout";
import { H1 } from "../components/Typography";
import { fetchHabits } from "../features/habits/habitActions";
import { P } from "../components/Typography";
import {
  getDaysInMonth,
  formatDate,
  areDatesEqual,
} from "../utils/dateHelpers";
import { createTask, deleteTask } from "../features/tasks/taskActions";

const COLORS = ["#fecaa4", "#fbba74", "#fcd34d"];

const DashboardScreen = () => {
  const currentDate = new Date();
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const days = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  const handleDayTaskClick = useCallback(
    ({ day, habit, completedTaskForTheDay }) => {
      if (completedTaskForTheDay) {
        dispatch(
          deleteTask({ habitId: habit.id, id: completedTaskForTheDay.id })
        );
      } else {
        dispatch(
          createTask({ habitId: habit.id, completed_at: day.toISOString() })
        );
      }
    },
    []
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
              <th key={i}>
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
          {habits.map((habit, i) => {
            return (
              <tr key={i}>
                <td className="whitespace-nowrap">
                  <P className="font-semibold mt-2 mr-2">{habit.name}</P>
                </td>
                {days.map((day, j) => {
                  const completedTaskForTheDay = habit.tasks.find((task) =>
                    areDatesEqual(new Date(task.completed_at), day)
                  );

                  return (
                    <td className="whitespace-nowrap" key={j}>
                      <div
                        style={{
                          backgroundColor: completedTaskForTheDay
                            ? COLORS[i]
                            : "#F1F5F9",
                        }}
                        className="rounded cursor-pointer w-6 h-6"
                        onClick={() =>
                          handleDayTaskClick({
                            day,
                            habit,
                            completedTaskForTheDay,
                          })
                        }
                      ></div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withSideNavLayout(DashboardScreen);
