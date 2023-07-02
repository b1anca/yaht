import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { areDatesEqual } from "../../utils/dateHelpers";
import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { DEFAULT_HABIT_COLOR } from "../../constants";
import NavLink from "../../components/NavLink";
import Spinner from "../../components/Spinner";

const Day = ({ tasks, day, habitId, habitColor }) => {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const completedTaskForTheDay = useCallback(
    tasks.find((task) => areDatesEqual(new Date(task.completed_at), day)),
    [tasks, habitId]
  );

  const handleDayTaskClick = useCallback(() => {
    if (loading || day > currentDate) {
      return;
    }

    setLoading(true);
    if (completedTaskForTheDay) {
      dispatch(deleteTask({ habitId, id: completedTaskForTheDay.id })).then(
        () => setLoading(false)
      );
    } else {
      dispatch(createTask({ habitId, completed_at: day.toISOString() })).then(
        () => setLoading(false)
      );
    }
  }, [day, currentDate, habitId]);

  return (
    <td>
      <div
        title={
          day > currentDate
            ? "This is a future date. You can't mark tasks as completed in advance."
            : completedTaskForTheDay
            ? "Click to unmark this day."
            : "Click to mark this day."
        }
        style={{
          backgroundColor: completedTaskForTheDay
            ? habitColor || DEFAULT_HABIT_COLOR
            : "unset",
        }}
        className={classNames(
          "mt-6 sm:mt-0 border border-slate-500 hover:border-slate-200 whitespace-nowrap rounded w-7 h-7 items-center inline-flex justify-center",
          { "cursor-pointer": day <= currentDate }
        )}
        onClick={handleDayTaskClick}
      >
        {loading && <Spinner />}
      </div>
    </td>
  );
};

const HabitRow = ({ id, name, tasks, days, color }) => {
  return (
    <tr>
      <td className="flex">
        <NavLink
          to={`/habits/${id}`}
          tetriary
          className="!p-0 truncate absolute max-w-[200px] sm:static"
        >
          {name}
        </NavLink>
      </td>
      {days.map((day) => (
        <Day
          key={`day-${day.toISOString()}`}
          day={day}
          tasks={tasks}
          habitId={id}
          habitColor={color}
        />
      ))}
    </tr>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  tasks: PropTypes.array,
  habitId: PropTypes.number,
  habitColor: PropTypes.string,
};

HabitRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.array,
  days: PropTypes.array,
};

export default HabitRow;
