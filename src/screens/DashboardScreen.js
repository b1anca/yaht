import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withSideNavLayout from "../hoc/withSidenavLayout";
import { H1 } from "../components/Typography";
import { fetchHabits } from "../features/habits/habitActions";
import { P } from "../components/Typography";
import { getDaysInMonth, formatDate } from "../utils/dateHelpers";

const COLORS = ["#fecaa4", "#fbba74", "#fcd34d"];

const DashboardScreen = () => {
  const currentDate = new Date();
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const days = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  return (
    <div>
      <H1>Today, {formatDate(currentDate)}</H1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className=""></th>
            {days.map((_, i) => (
              <th className="" key={i}>
                <P>{i}</P>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, i) => {
            return (
              <tr key={i}>
                <td className="whitespace-nowrap">
                  <P className="font-semibold mt-2 mr-2">{habit.name}</P>
                </td>
                {days.map((_, j) => (
                  <td className="whitespace-nowrap" key={j}>
                    <div
                      style={{ backgroundColor: COLORS[i] }}
                      className="w-6 h-6"
                    ></div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withSideNavLayout(DashboardScreen);
