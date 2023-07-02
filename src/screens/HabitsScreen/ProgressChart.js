import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { COLORS, DEFAULT_HABIT_COLOR } from "../../constants";

const ProgressChart = ({ value, color }) => {
  const data = [
    { name: "Overall progress", value },
    { name: "Uncompleted tasks", value: Number((100 - value).toFixed(2)) },
  ];

  return (
    <div className="h-[130px] w-[130px] mr-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
            stroke={COLORS.slate400}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0 ? color || DEFAULT_HABIT_COLOR : "transparent"
                }
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

ProgressChart.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressChart;
