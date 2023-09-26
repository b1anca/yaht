import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { areDatesEqual } from "../../utils/dateHelpers";
import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { DEFAULT_HABIT_COLOR } from "../../constants";
import NavLink from "../../components/NavLink";

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
    <td>
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
            task || loading ? habitColor || DEFAULT_HABIT_COLOR : "#dce2ed",
        }}
        className={classNames(
          "mr-2 ml-2 mt-6 sm:mt-0 border hover:border-zinc-400 whitespace-nowrap rounded w-9 h-9 items-center inline-flex justify-center",
          { "cursor-pointer": day <= currentDate, "animate-pulse": loading }
        )}
        onClick={handleDayTaskClick}
      />
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
          className="!p-0 truncate absolute max-w-[200px] sm:static mr-2"
        >
          {name}
        </NavLink>
      </td>
      {days.map((day) => {
        const completedTaskForTheDay = tasks.find((task) =>
          areDatesEqual(new Date(task.completed_at), day)
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
    </tr>
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
};

export default HabitRow;
