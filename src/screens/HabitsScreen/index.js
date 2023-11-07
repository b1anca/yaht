import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, P } from "../../components/Typography";
import { fetchHabits } from "../../features/habits/habitActions";
import { getWeekName, getMonthName } from "../../utils/dateHelpers";
import NavLink from "../../components/NavLink";
import Heatmap from "../../components/Heatmap";
import ProgressBar from "../../components/ProgressBar";
import RadarChart from "../../components/RadarChart";
import WeekHabits from "./WeekHabits";

// TODO:
// - error tracking, monitoring for the react app
// - tests for the other components (meet coverage threshold)
// - show formatted date (with weekday) on tracker hover
// - delete habit
// - notes for habits
// - loading state when loading habist (habits screen)
// - allow changing month (habits screen)
// - allow changing year (habit screen)

// - perfect days

const HabitsScreen = () => {
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.habits);
  const currentDate = new Date();

  useEffect(() => {
    dispatch(fetchHabits());
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

  const progressPerHabit = useMemo(
    () =>
      habits.reduce(
        (arr, habit) =>
          arr.concat({
            subject: habit.name,
            A: Number(habit.overall_progress),
          }),
        []
      ),
    [habits]
  );

  const completedTasksSum = useMemo(
    () => Object.values(data).reduce((s, v) => (s += v), 0),
    [habits]
  );

  const completedTodayCount = data[new Date().toLocaleDateString()] || 0;
  const completedTodayPercentage =
    (completedTodayCount / habits.length) * 100 || 0;

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
      <P bold>{completedTodayPercentage.toFixed(2)}% achieved</P>
      <WeekHabits habits={habits} data={data} />
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 my-6" />
      <P bold>{completedTasksSum} tasks completed in the last year</P>
      <Heatmap data={data} />
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 my-6" />
      <P bold>Your stats</P>
      <RadarChart data={progressPerHabit} legend="Overall progress %" />
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 my-6" />
    </div>
  );
};

export default HabitsScreen;
