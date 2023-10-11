import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { COLORS, DEFAULT_HABIT_COLOR } from "../../constants";
import { P } from "../../components/Typography";

const ProgressChart = ({ value, color, withTooltip = false }) => {
  const data = [
    { name: "Overall progress", value },
    { name: "Uncompleted tasks", value: Number((100 - value).toFixed(2)) },
  ];

  return (
    <div className="h-[130px] w-[130px] relative">
      <P
        bold
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {value}%
      </P>
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
          {withTooltip && <Tooltip />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

ProgressChart.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  withTooltip: PropTypes.bool,
};

export default ProgressChart;
