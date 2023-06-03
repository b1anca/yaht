import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { P } from "../../components/Typography";
import { areDatesEqual } from "../../utils/dateHelpers";
import { deleteTask, createTask } from "../../features/tasks/taskActions";
import { COLORS } from "../../constants";

const Day = ({ tasks, day, habitId, habitColor }) => {
  const currentDate = new Date();
  const dispatch = useDispatch();

  const completedTaskForTheDay = useCallback(
    tasks.find((task) => areDatesEqual(new Date(task.completed_at), day)),
    [tasks, habitId]
  );

  const handleDayTaskClick = useCallback(() => {
    if (day > currentDate) {
      return;
    }

    if (completedTaskForTheDay) {
      dispatch(deleteTask({ habitId, id: completedTaskForTheDay.id }));
    } else {
      dispatch(createTask({ habitId, completed_at: day.toISOString() }));
    }
  }, [day, currentDate, habitId]);

  return (
    <td>
      <div
        style={{
          backgroundColor: completedTaskForTheDay
            ? habitColor || COLORS.slate700
            : COLORS.slate100,
        }}
        className={classNames("whitespace-nowrap rounded w-6 h-6", {
          "cursor-pointer": day <= currentDate,
        })}
        onClick={handleDayTaskClick}
      />
    </td>
  );
};

const HabitRow = ({ id, name, tasks, days, color }) => {
  return (
    <tr>
      <td>
        <P className="whitespace-nowrap font-semibold mt-2 mr-2">{name}</P>
      </td>
      {days.map((day, j) => (
        <Day key={j} day={day} tasks={tasks} habitId={id} habitColor={color} />
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
