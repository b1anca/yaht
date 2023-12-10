import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { DEFAULT_HABIT_COLOR } from "../../constants";
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
    if (task) {
      dispatch(deleteTask({ habitId, id: task.id })).then(() =>
        setLoading(false)
      );
    } else {
      dispatch(createTask({ habitId, completed_at: day.toISOString() })).then(
        () => setLoading(false)
      );
    }
  }, [day, currentDate, habitId, loading]);

  return (
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
        "m-auto hover:border-2 whitespace-nowrap rounded w-8 h-8 items-center inline-flex justify-center",
        {
          "cursor-pointer hover:border-zinc-500": day <= currentDate,
          "animate-pulse": loading,
          "dark:!bg-[#24292E] !bg-slate-200": !(task || loading),
        }
      )}
      onClick={handleDayTaskClick}
    />
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
    <>
      <NavLink
        to={`/habits/${id}`}
        tetriary
        className="!p-0 truncate absolute sm:static mr-2 !text-base"
      >
        {name}
      </NavLink>
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
      <P className="!mb-0 text-center">{current_streak}</P>
      <P className="!mb-0 text-center">{record_streak}</P>
      <P className="!mb-0 text-center">{overall_progress}%</P>
    </>
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
