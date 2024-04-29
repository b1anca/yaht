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
import YearlyGrid from "../components/YearlyGrid";
import ProgressBar from "../components/ProgressBar";
import PieChart from "../components/PieChart";
import { BG_COLORS, BORDER_STYLES } from "../constants";

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
    <div>
      <div>
        <div className="flex align-center">
          <Heading level="h2" className="!mb-0">
            {habit.name}
          </Heading>
          <NavLink to={`/habits/${id}/edit`} className="!text-xl px-0" tertiary>
            <FontAwesomeIcon icon={faEdit} />
          </NavLink>
        </div>
        <P secondary semibold>
          {habit.description}
        </P>
      </div>
      <div className="flex">
        <div className={`grow ${BORDER_STYLES.default} p-2 mr-2`}>
          <P bold>Completed {completedTasksSum} times in the last year</P>
          <YearlyGrid data={data} color={habit.color} />
        </div>
        <div className="grow">
          <div className="flex">
            <div className="border border-slate-900/10 dark:border-slate-100/10 py-2 px-4 mr-4">
              <P bold>Overall progress</P>
              <PieChart
                data={[
                  { value: Number(habit.overall_progress) },
                  { value: Number(100 - Number(habit.overall_progress)) },
                ]}
                innerLabel={`${Number(habit.overall_progress)}%`}
                color={habit.color}
              />
            </div>
            <div className="flex flex-col border border-slate-900/10 dark:border-slate-100/10 py-2 px-4">
              <div className="flex">
                <div className="mr-4">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 mr-1"
                      style={{ backgroundColor: habit.color }}
                    />
                    <P semibold className="!mb-0">
                      Current streak
                    </P>
                  </div>
                  <Heading level="h2">{habit.current_streak}</Heading>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className={`${BG_COLORS.secondary} w-3 h-3 mr-1`} />
                    <P semibold className="!mb-0">
                      Longest streak
                    </P>
                  </div>
                  <Heading level="h2">{habit.record_streak}</Heading>
                </div>
              </div>
              <ProgressBar
                value={(habit.current_streak / habit.record_streak) * 100}
                color={habit.color}
              />
              <P secondary className="mt-auto">
                Started on {format(parseISO(habit.created_at), "MMMM dd, yyyy")}
              </P>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HabitScreen.displayName = "HabitScreen";

export default HabitScreen;
