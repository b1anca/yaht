import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { format } from "date-fns";
import { Heading, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import NavLink from "../../components/NavLink";
import YearlyGrid from "../../components/YearlyGrid";
import ProgressBar from "../../components/ProgressBar";
import LoadingDots from "../../components/LoadingDots";
import WeeklyTracker from "./WeeklyTracker";

// TODO:
// - error tracking, monitoring for the react app
// - tests for the other components (meet coverage threshold)
// - delete habit
// - notes for habits
// - allow changing year (habit screen)

// - perfect days

const HabitsScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { habits } = useSelector((state) => state.habits);
  const currentDate = new Date();

  useEffect(() => {
    dispatch(fetchHabits()).then(() => setLoading(false));
  }, []);

  const data = useMemo(
    () =>
      habits.reduce((h, habit) => {
        habit.tasks.forEach((t) => {
          const date = new Date(t.completed_at).toLocaleDateString();
          if (h[date]) {
            h[date] += 1;
          } else {
            h[date] = 1;
          }
        });
        return h;
      }, {}),
    [habits]
  );

  const completedTasksSum = useMemo(
    () => Object.values(data).reduce((s, v) => (s += v), 0),
    [habits]
  );

  const completedTodayCount = data[new Date().toLocaleDateString()] || 0;
  const completedTodayPercentage =
    (completedTodayCount / habits.length) * 100 || 0;

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <Heading level="h2" className="!mb-0">
            {`Today, ${format(
              currentDate,
              "MMM"
            )} ${currentDate.getDate()} ${format(currentDate, "EEE")}`}
          </Heading>
          <NavLink
            className={classNames("!w-min h-min", {
              "animate-bounce": habits.length === 0,
            })}
            primary
            to="/habits/new"
          >
            Add habit
          </NavLink>
        </div>
        <ProgressBar value={completedTodayPercentage} className="mb-1" />
        <P semibold>{completedTodayPercentage.toFixed(2)}% achieved</P>
        <WeeklyTracker habits={habits} data={data} />
        <div className="border-b border-slate-900/10 dark:border-slate-100/10 my-6" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-900/10 dark:border-slate-100/10 p-3 rounded-sm">
          <P semibold>{completedTasksSum} tasks completed in the last year</P>
          <YearlyGrid data={data} />
        </div>
        {habits.map((habit) => {
          const habitData = habit.tasks.reduce((h, t) => {
            const date = new Date(t.completed_at).toLocaleDateString();
            if (h[date]) {
              h[date] += 1;
            } else {
              h[date] = 1;
            }
            return h;
          }, {});
          const completedTasksSum = Object.keys(habitData).length;

          return (
            <div
              key={habit.id}
              className="border border-slate-900/10 dark:border-slate-100/10 p-3 rounded-sm"
            >
              <div className="mb-2">
                <NavLink
                  to={`/habits/${habit.id}`}
                  tetriary
                  className="!p-0 !text-base"
                >
                  {habit.name}
                </NavLink>
                <P className="inline">
                  {` - ${completedTasksSum} tasks completed`}
                </P>
              </div>
              <YearlyGrid data={habitData} color={habit.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitsScreen;
