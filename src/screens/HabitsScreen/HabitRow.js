import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isSameDay, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faTrophy, faCheck } from "@fortawesome/free-solid-svg-icons";

import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { fetchHabit } from "../../features/habits/habitActions";
import { DEFAULT_HABIT_COLOR, BORDER_STYLES } from "../../constants";
import NavLink from "../../components/NavLink";
import { P } from "../../components/Typography";

const Day = ({ task, day, habitId, habitColor, habitName }) => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const formattedDay = `${format(day, "MMM")} ${day.getDate()} ${format(
    day,
    "EEE"
  )}`;

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
            ? `Click to unmark ${formattedDay} for "${habitName}"`
            : `Click to mark ${formattedDay} for "${habitName}"`
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
            habitName={name}
          />
        );
      })}
      <div
        className="flex justify-end w-[30px]"
        title={`${name} current streak`}
      >
        <P semibold className="!mb-0 pr-1">
          {current_streak}
        </P>
        <P secondary className="!m-0">
          <FontAwesomeIcon icon={faFire} />
        </P>
      </div>
      <div
        className="flex justify-end w-[45px]"
        title={`${name} record streak`}
      >
        <P semibold className="!mb-0 pr-1">
          {record_streak}
        </P>
        <P secondary className="!m-0">
          <FontAwesomeIcon icon={faTrophy} />
        </P>
      </div>
      <div className="flex justify-end w-[70px]" title={`${name} % completed`}>
        <P semibold className="!mb-0 pr-1">
          {overall_progress}%
        </P>
        <P secondary className="!m-0">
          <FontAwesomeIcon icon={faCheck} />
        </P>
      </div>
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  task: PropTypes.object,
  habitId: PropTypes.number,
  habitColor: PropTypes.string,
  habitName: PropTypes.string,
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
