import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Heading, P } from "../components/Typography";
import NavLink from "../components/NavLink";
import { selectHabitById } from "../features/habits/habitSelectors";
import { fetchHabit } from "../features/habits/habitActions";
import Heatmap from "../components/Heatmap";
import ProgressBar from "../components/ProgressBar";
import PieChart from "../components/PieChart";

const HabitScreen = () => {
  const { id } = useParams();
  const habit = useSelector(selectHabitById(id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!habit) {
      dispatch(fetchHabit(id));
    }
  }, []);

  const data = habit?.tasks.reduce((h, t) => {
    const date = new Date(t.completed_at).toLocaleDateString();
    if (h[date]) {
      h[date] += 1;
    } else {
      h[date] = 1;
    }
    return h;
  }, {});

  const completedTasksSum = habit?.tasks.reduce((s, t) => {
    if (t.completed_at) s += 1;
    return s;
  }, 0);

  if (!habit) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <Heading level="h2" className="!mb-1">
            {habit.name}
          </Heading>
          <P bold>{habit.description}</P>
        </div>
        <NavLink to={`/habits/${id}/edit`} className="!text-xl px-0" tetriary>
          <FontAwesomeIcon icon={faEdit} />
        </NavLink>
      </div>
      <div className="flex">
        <div className="border border-slate-900/10 dark:border-slate-100/10 py-2 px-4 mr-4">
          <P bold>Overall progress</P>
          <PieChart
            data={[
              { value: Number(habit.overall_progress) },
              { value: Number(100 - Number(habit.overall_progress)) },
            ]}
            innerLabel={`${Number(habit.overall_progress)}%`}
          />
        </div>
        <div className="flex flex-col border border-slate-900/10 dark:border-slate-100/10 py-2 px-4">
          <div className="flex">
            <div className="mr-4">
              <div className="flex items-baseline">
                <div className="bg-sky-600 p-1 mr-1" />
                <P bold>Current streak</P>
              </div>
              <Heading level="h2">{habit.current_streak}</Heading>
            </div>
            <div>
              <div className="flex items-baseline">
                <div className="bg-slate-200 p-1 mr-1" />
                <P bold>Longest streak</P>
              </div>
              <Heading level="h2">{habit.record_streak}</Heading>
            </div>
          </div>
          <ProgressBar
            value={(habit.current_streak / habit.record_streak) * 100}
          />
          <P bold className="mt-auto">
            Started on {format(parseISO(habit.created_at), "MMMM dd, yyyy")}
          </P>
        </div>
      </div>
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 my-6" />
      <P bold>{completedTasksSum} tasks completed in the last year</P>
      <Heatmap data={data} oneColor />
    </>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
