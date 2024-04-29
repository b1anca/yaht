import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { fetchHabit } from "../../features/habits/habitActions";
import { DEFAULT_HABIT_COLOR, BORDER_STYLES } from "../../constants";
import NavLink from "../../components/NavLink";
import { P } from "../../components/Typography";

const Day = ({ task, day, habitId, habitColor }) => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const handleDayTaskClick = useCallback(() => {
    if (loading || day > currentDate) {
      return;
    }

    setLoading(true);
    dispatch(
      task
        ? deleteTask({ habitId, id: task.id })
        : createTask({ habitId, completed_at: day.toISOString() })
    )
      .then(() => dispatch(fetchHabit(habitId)))
      .then(() => setLoading(false));
  }, [day, currentDate, habitId, loading]);

  return (
    <div className="grow text-center">
      <div
        title={
          day > currentDate
            ? "This is a future date. You can't mark tasks as completed in advance."
            : task
            ? "Click to unmark this day."
            : "Click to mark this day."
        }
        style={{
          backgroundColor:
            task || loading ? habitColor || DEFAULT_HABIT_COLOR : "unset",
        }}
        className={classNames(
          "m-auto whitespace-nowrap rounded w-6 h-6 items-center flex inline-flex justify-center opacity-80",
          {
            "cursor-pointer hover:border hover:border-zinc-500":
              day <= currentDate,
            "animate-pulse": loading,
            "dark:!bg-[#24292E] !bg-slate-200": !(task || loading),
            [`border ${BORDER_STYLES.light}`]: task || loading,
          }
        )}
        onClick={handleDayTaskClick}
      />
    </div>
  );
};

const HabitRow = ({
  id,
  name,
  tasks,
  days,
  color,
  current_streak,
  record_streak,
  overall_progress,
}) => {
  return (
    <div className="flex">
      <div className="w-[200px]">
        <NavLink to={`/habits/${id}`} tertiary className="!p-0 truncate mr-2">
          {name}
        </NavLink>
      </div>
      {days.map((day) => {
        const completedTaskForTheDay = tasks.find((task) =>
          isSameDay(new Date(task.completed_at), day)
        );

        return (
          <Day
            key={`day-${day.toISOString()}`}
            day={day}
            task={completedTaskForTheDay}
            habitId={id}
            habitColor={color}
          />
        );
      })}
      {/* <P className="!mb-0 text-center">{current_streak}</P>
      <P className="!mb-0 text-center">{record_streak}</P>
      <P className="!mb-0 text-center">{overall_progress}%</P> */}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  task: PropTypes.object,
  habitId: PropTypes.number,
  habitColor: PropTypes.string,
};

HabitRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.array,
  days: PropTypes.array,
  current_streak: PropTypes.number,
  record_streak: PropTypes.number,
  overall_progress: PropTypes.string,
};

export default HabitRow;
